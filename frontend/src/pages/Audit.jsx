import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../api/auditApi';

const Audit = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(data => setLogs(data));
  }, []);

    return (
        <div className="container mx-auto p-4 text-white">
          <div className="mb-4">
          </div>
          {logs.map((employee, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Audit:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
    );
};

export default Audit;