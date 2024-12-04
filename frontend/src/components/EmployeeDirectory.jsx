import React, { useState, useEffect } from 'react';
import { getEmployees } from '../api/employeeApi';
import { getDepartments, getLocations } from '../api/infoApi';
import EmployeePopup from './EmployeePopup';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departmentJobsMap, setdepartmentJobsMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", job_title: "", location: "", start_date: "", end_date: "" });
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    getEmployees().then(data => setEmployees(data));
    getDepartments().then(data => setdepartmentJobsMap(data));
    getLocations().then(data => (setLocations(data)));
  }, []);

  useEffect(() => {;
    const filteredEmployees = employees.filter(employee => {
      return (
        (employee.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.department ? employee.department === filters.department : true) &&
        (filters.job_title ? employee.job_title === filters.job_title : true) && 
        (filters.location ? employee.office_name === filters.location : true) &&
        (filters.start_date ? new Date(employee.hired_date) >= new Date(filters.start_date) : true) &&
        (filters.end_date ? new Date(employee.hired_date) <= new Date(filters.end_date) : true)
      );
    });
    setFilteredEmployees(filteredEmployees);
  }, [searchQuery, filters, employees]);
  
  const resetDetails = () => {
    setFilters({ department: "", job_title: "", location: "", start_date: "", end_date: "" });
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
      <div className="mb-4 flex items-center">
        <input 
          type="text"
          placeholder="Search employees..."
          className="border p-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mx-6">
          <p className="text-gray-700">Showing {filteredEmployees.length} employees</p>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <select 
          className="border p-2 rounded"
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">Filter by Department</option>
          {Object.keys(departmentJobsMap).sort().map((department, index)  => (
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
          {Object.values(departmentJobsMap).flat().sort().map((job, index)  => (
              <option key={index} value={job}>
                {job}
              </option>
          ))}
        </select>

        <select 
          className="border p-2 rounded ml-2"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Filter by Location</option>
          {Object.keys(locations).map((location, index)  => (
              <option key={index} value={locations[location]}>
                {location.split(", ").pop()}
              </option>
          ))}
        </select>

        <input 
          type="date"
          className="border p-2 rounded ml-2"
          value={filters.start_date}
          onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
        />

        <input 
          type="date"
          className="border p-2 rounded ml-2"
          value={filters.end_date}
          onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
        />
        
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
