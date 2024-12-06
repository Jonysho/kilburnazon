import React, { useEffect, useState } from 'react';
import { getEmployees } from '../api/birthdayApi';

const Birthday = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(data => setEmployees(data));
  }, []);

    return (
        <div className="container mx-auto p-4 text-white">
          <div className="mb-4">
          </div>
          {employees.map((employee, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Birthday:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
    );
};

export default Birthday;