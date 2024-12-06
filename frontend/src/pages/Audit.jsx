import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../api/auditApi';

const Audit = () => {
  const [logs, setLogs] = useState([]);
  const [expandedLogIndex, setExpandedLogIndex] = useState(null);

  useEffect(() => {
    getAuditLogs().then(data => {
      console.log(data);
      setLogs(data);
    });
  }, []);

  const toggleDetails = (index) => {
    setExpandedLogIndex(expandedLogIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl mb-4">Audit Logs</h1>
      {logs.map((log, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-800">
          <h2 className="text-xl mb-2">{log.name}</h2>
          <p><strong>Employee ID:</strong> {log.employee_id}</p>
          <p><strong>Termination Date:</strong> {new Date(log.termination_date).toLocaleDateString()}</p>
          <p><strong>Termination Time:</strong> {log.termination_time}</p>
          <button 
            className="mt-2 text-blue-500" 
            onClick={() => toggleDetails(index)}
          >
            {expandedLogIndex === index ? 'View Less Details' : 'View More Details'}
          </button>
          {expandedLogIndex === index && (
            <div className="mt-4">
              <p><strong>Job Title:</strong> {log.job_title}</p>
              <p><strong>Email:</strong> {log.email}</p>
              <p><strong>Date of Birth:</strong> {new Date(log.dob).toLocaleDateString()}</p>
              <p><strong>Home Address:</strong> {log.home_address}</p>
              <p><strong>Hired Date:</strong> {new Date(log.hired_date).toLocaleDateString()}</p>
              <p><strong>Contract:</strong> {log.contract}</p>
              <p><strong>NIN:</strong> {log.nin}</p>
              <p><strong>Deleted By:</strong> {log.deleted_by}</p>
              <p><strong>Record Expiry Date:</strong> {new Date(log.record_expiry_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Audit;