import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

const UserTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTriggerReason, setFilterTriggerReason] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState(data);
  const [triggerReasons, setTriggerReasons] = useState([]);
  const [riskLevels, setRiskLevels] = useState([]);

  useEffect(() => {
    // Extract unique trigger reasons for filtering options
    const uniqueTriggerReasons = [
      ...new Set(data.map((user) => user.trigger_reason)),
    ];
    setTriggerReasons(uniqueTriggerReasons);

    // Extract unique risk levels for filtering options
    const uniqueRiskLevels = [...new Set(data.map((user) => user.risk_level))];
    setRiskLevels(uniqueRiskLevels);
  }, [data]);

  // Helper function to get the sort icon based on the sort order
  const getSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  // Sorting function
  const sortByCriteria = (criteria) => {
    if (sortCriteria === criteria) {
      // Toggle the sort order if the same criteria is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sorting criteria and default to ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  // Use useEffect to run the sorting and filtering logic
  useEffect(() => {
    // Apply filtering based on search term, trigger reason, and risk level
    const filtered = data.filter(
      (user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (filterTriggerReason
          ? user.trigger_reason === filterTriggerReason
          : true) &&
        (filterRiskLevel ? user.risk_level === filterRiskLevel : true)
    );

    // Apply sorting based on sort criteria and order
    if (sortCriteria) {
      filtered.sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        // Adjust the comparison based on data type
        if (typeof aValue === 'string' || typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' || typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        // Default to string comparison if the data type is not recognized
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }

    // Update the state with the filtered and sorted data
    setFilteredData(filtered);
  }, [searchTerm, filterTriggerReason, filterRiskLevel, sortCriteria, sortOrder, data]);

  return (
    <div>
      {/* Search input */}
      <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: '370px',
        height: '40px',
        marginTop:'36px',
        padding: '8px 16px 8px 16px',
        borderRadius: '9px 8px 8px 9px',
        border: '1px solid',
        gap: '10px',
        background:'#FFFFFF',
        border:'#E4E4E4 solid 1px',
        color:'#000',
         fontFamily: "'Lettera Text LL', sans-serif",
      }}
    />

      {/* Filter by trigger reason */}
      <select
        value={filterTriggerReason}
        onChange={(e) => setFilterTriggerReason(e.target.value)}
        className={styles.selectInput}
      >
        <option value="">Trigger Reason</option>
        {triggerReasons.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </select>

      {/* Filter by risk level */}
      <select
        value={filterRiskLevel}
        onChange={(e) => setFilterRiskLevel(e.target.value)}
       
        className={styles.selectInput2}
      >
        <option value="">Risk Level</option>
        {riskLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>
  {/* Filter by trigger reason */}
 

  <div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ fontFamily: "'Lettera Text LL', sans-serif", width: '100%', height: '400px', top: '253px', left: '306px', borderCollapse: 'collapse', border: '1px solid #E4E4E4'}}>
  <thead>
    <tr>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', textAlign: 'left', paddingLeft: '22px', borderBottom: '1px solid #000' }}>User</th>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', borderBottom: '1px solid #000' }} onClick={() => sortByCriteria('risk_level')}>Risk Level {getSortIcon('risk_level')}</th>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', borderBottom: '1px solid #000' }} onClick={() => sortByCriteria('in_queue_for')}>Trigger Reason {getSortIcon('in_queue_for')}</th>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', borderBottom: '1px solid #000' }}>In Queue For</th>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', borderBottom: '1px solid #000' }} onClick={() => sortByCriteria('date_added_on')}>Date Added On {getSortIcon('date_added_on')}</th>
      <th style={{ background: '#E4E4E4', height: '48px', fontSize: '12px', borderBottom: '1px solid #000' }}>Previously Reviewed</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((user, index) => (
      <tr key={index} style={{ borderBottom: '1px solid #E4E4E4' }}>
        <td style={{ textAlign: 'left', paddingLeft: '20px', fontSize: '14px' }}>
          <div>
            <strong>{user.name}</strong>
            <p> {user.email}</p>
          </div>
        </td>
        <td style={{ alignItems: 'center', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                marginRight: '8px',
                marginLeft: '10px',
                backgroundColor: getRiskLevelColor(user.risk_level),
              }}
            ></div>
            <span style={{ color: getRiskLevelColor(user.risk_level), fontSize: '14px' }}>{user.risk_level}</span>
          </div>
        </td>
        <td style={{ textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #E4E4E4' }}>{user.trigger_reason}</td>
        <td style={{ textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #E4E4E4' }}>{user.in_queue_for}</td>
        <td style={{ textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #E4E4E4' }}>{user.date_added_on}</td>
        <td style={{fontSize:'14px', paddingLeft: '25px'}}>
        {user.previously_reviewed === 'Yes' ? (
          <>
            <p style={{fontWeight: 'bold' }}> Yes</p>
            <p>{user.previously_reviewed_date}</p>
          </>
        ) : (
          <p style={{fontWeight: 'bold'}}> No</p>
        )}
      </td>
      </tr>
    ))}
  </tbody>
</table>
</div>






    </div>
  );
};
// Add a helper function to determine the color based on risk level
const getRiskLevelColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Medium':
      return '#88670F'; // Choose the color for Medium risk level
    case 'High':
      return '#7D2424'; // Choose the color for High risk level
    case 'Low':
      return '#006540'; // Choose the color for Low risk level
    default:
      return 'black'; // Default color
  }
};


export default UserTable;


