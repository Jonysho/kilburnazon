import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", jobTitle: "" });

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data);
        console.log("Employees fetched successfully", response.data);
      })
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const filteredEmployees = employees.filter(employee => {
    return (
      (employee.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.department ? employee.department === filters.department : true) &&
      (filters.jobTitle ? employee.jobTitle === filters.jobTitle : true)
    );
  });


  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search employees..."
          className="border p-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select 
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">Filter by Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select 
          className="border p-2 rounded ml-2"
          onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
        >
          <option value="">Filter by Job Title</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={employee.photoUrl} alt={employee.name} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">{employee.jobTitle}</p>
            <p className="text-gray-600">{employee.department}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
