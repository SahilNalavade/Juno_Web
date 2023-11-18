// UserTable.js

import React, { useState, useEffect } from 'react';

const UserTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTriggerReason, setFilterTriggerReason] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState('');
  const [triggerReasons, setTriggerReasons] = useState([]);

  useEffect(() => {
    // Extract unique trigger reasons for filtering options
    const uniqueTriggerReasons = [
      ...new Set(data.map((user) => user.trigger_reason)),
    ];

    setTriggerReasons(uniqueTriggerReasons);
  }, [data]);

  // Filter data based on the search term, trigger reason, and risk level
  const filteredData = data.filter(
    (user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (filterTriggerReason ? user.trigger_reason === filterTriggerReason : true) &&
      (filterRiskLevel ? user.risk_level === filterRiskLevel : true)
  );

  // Extract unique risk levels for filtering options
  const riskLevels = [...new Set(data.map((user) => user.risk_level))];

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter by trigger reason */}
      <select
        value={filterTriggerReason}
        onChange={(e) => setFilterTriggerReason(e.target.value)}
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
      >
        <option value="">Risk Level</option>
        {riskLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>

      {/* Display table with filtered data */}
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Risk Level</th>
            <th>Trigger Reason</th>
            <th>In Queue For</th>
            <th>Date Added On</th>
            <th>Previously Reviewed</th>
          </tr>
        </thead>
        <tbody>
  {filteredData.map((user, index) => (
    <tr key={index}>
      <td>
        <div>
          <strong>{user.name}</strong>
          <p> {user.email}</p>
        </div>
      </td>
      <td>{user.risk_level}</td>
      <td>{user.trigger_reason}</td>
      <td>{user.in_queue_for}</td>
      <td>{user.date_added_on}</td>
      <td>
        {user.previously_reviewed === 'Yes' ? (
          <>
            <p> Yes</p>
            <p>{user.previously_reviewed_date}</p>
          </>
        ) : (
          <p> No</p>
        )}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default UserTable;
