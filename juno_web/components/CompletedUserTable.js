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
  const getSortIcon = (criteria, defaultOrder) => {
    const currentSortOrder =
      sortCriteria === criteria ? sortOrder : defaultOrder;

    return currentSortOrder === 'asc' ? '▲' : '▼';
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
 

  <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>User</th>
              <th
                className={styles.tableHeader}
                onClick={() => sortByCriteria('risk_level')}
              >
                Risk Level{' '}
                {getSortIcon('risk_level', 'asc')}
              </th>
              <th
                className={styles.tableHeader}
                
              >
                Action Reason{' '}
                
              </th>
              <th className={styles.tableHeader}>Time to close</th>
              <th
                className={styles.tableHeader}
                onClick={() => sortByCriteria('date_added_on')}
              >
                Date Added On{' '}
                {getSortIcon('date_added_on', 'asc')}
              </th>
              <th className={styles.tableHeader}>Action taken by</th>
            </tr>
          </thead>
  <tbody className={styles.tableBody}>
    {filteredData.map((user, index) => (
      <tr key={index} className={styles.tableRow}>
        <td className={styles.tableDataCell} style={{ textAlign: 'left', paddingLeft: '20px' }}>
          <div>
            <strong>{user.name}</strong>
            <p> {user.email}</p>
          </div>
        </td>
        <td className={styles.tableDataCell} style={{ alignItems: 'center' }}>
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
            <span style={{ color: getRiskLevelColor(user.risk_level)}}>{user.risk_level}</span>
          </div>
        </td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4' }}>{user.action_reason}</td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4' }}>{user.in_queue_for}</td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4' }}>{user.date_added_on}</td>
        <td className={styles.tableDataCell} style={{ textAlign: 'left', paddingLeft: '20px'}}>
          <p style={{ fontWeight: 'bold' }}>{user.action_taken_by.name}</p>
          <p style={{ fontWeight: 'bold', color: '#777676' }}>{user.action_taken_by.email}</p>
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


