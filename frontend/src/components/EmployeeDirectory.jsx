import React, { useState, useEffect } from 'react';
import { getEmployees } from '../api/employeeApi';
import { getDepartments } from '../api/departmentApi';
import EmployeePopup from './EmployeePopup';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [departmentJobsMap, setdepartmentJobsMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", job_title: "", location: "", start_date: ""});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees().then(data => setEmployees(data));
    getDepartments().then(data => setdepartmentJobsMap(data));
  }, []);

  useEffect(() => {
    const filteredEmployees = employees.filter(employee => {
      return (
        (employee.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.department ? employee.department === filters.department : true) &&
        (filters.job_title ? employee.job_title === filters.job_title : true)
      );
    });
    setFilteredEmployees(filteredEmployees);
  }, [searchQuery, filters, employees]);
  
  const resetDetails = () => {
    setFilters({ department: "", job_title: "", location: "", start_date: "" });
    setSearchQuery("");
  };


  const openDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDetails = () => {
    setSelectedEmployee(null);
  };

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

      <div className="mb-4 flex items-center">
        <select 
          className="border p-2 rounded"
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">Filter by Department</option>
          {Object.keys(departmentJobsMap).map((department, index)  => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>

        <select 
          className="border p-2 rounded ml-2"
          value={filters.job_title}
          onChange={(e) => setFilters({ ...filters, job_title: e.target.value })}
        >
          <option value="">Filter by Job Title</option>
          {Object.values(departmentJobsMap).flat().map((job, index)  => (
              <option key={index} value={job}>
                {job}
              </option>
          ))}
        </select>

        <button 
          className="border p-2 rounded ml-2 bg-red-500 text-white"
          onClick={() => resetDetails()}>
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEmployees.map((employee, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img src={employee.imageUrl || "images/profile.avif "}  alt={employee.name} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">{employee.job_title}</p>
            <p className="text-gray-600">{employee.department}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => openDetails(employee)}>
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedEmployee ? <EmployeePopup employee={selectedEmployee} onClose={closeDetails} /> : null}
    </div>
  );
};

export default EmployeeDirectory;
