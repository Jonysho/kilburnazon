import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getJobs, getOffices } from '../api/infoApi';
import { addEmployee, getEmployeeById, promoteEmployee, updateEmployee } from '../api/employeeApi';
import { EmployeeForm } from '../components/EmployeeForm';
import { PromoteForm } from '../components/PromoteForm';

const Management = () => {
  const [newEmployee, setNewEmployee] = useState({ name: '', job: '', office: '', email: '', salary: '', dob: '', home_address: '', contract: '', hired_date: '', nin: ''});
  const [oldEmployee, setOldEmployee] = useState({ name: '', job: '', office: '', email: '', salary: '', dob: '', home_address: '', contract: '', hired_date: '', nin: ''});
  const [searchId, setSearchId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [offices, setOffices] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [view, setView] = useState('Add'); // State to manage which form is displayed
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getJobs().then(data => setJobs(data));
    getOffices().then(data => setOffices(data));
  }, [])

  useEffect(() => {
    // setError(null);
    // setSuccess(null);
  }, [newEmployee, oldEmployee]);

  const resetInfo = () => {
    setNewEmployee({ name: '', job: '', office: '', email: '', salary: '', dob: '', home_address: '', contract: '', hired_date: '', nin: ''});
    setOldEmployee({ id: '', name: '', job: '', office: '', email: '', salary: '', dob: '', home_address: '', contract: '', hired_date: '', nin: ''});
    setSearchId('');
    setPercentage(0);
  }

  const updateView = (view) => {
    setView(view);
    resetInfo();
    setError(null);
    setSuccess(null);
  }

  const handleAddEmployee = async (e) => {
    setError(null);
    setSuccess(null);
    e.preventDefault();
    try {
        await addEmployee(newEmployee)
        // resetInfo();
        setSuccess('Employee added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    setError(null);
    setSuccess(null);
    e.preventDefault();
    try {
        await updateEmployee(oldEmployee)
        resetInfo();
        setSuccess('Employee updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePromote = async (e) => {
    setError(null);
    setSuccess(null);
    e.preventDefault();
    try {
        await promoteEmployee(oldEmployee.employee_id, percentage)
        // resetInfo();
        setSuccess('Employee promoted successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async () => {
    setError(null);
    setSuccess(null);
    try {
      const data = await getEmployeeById(searchId);
      if (!data) {
        setError('Employee not found');
        return;
      }
      const confirmUpdate = window.confirm(`Are you sure you want to edit ${data.name}?`);
      if (confirmUpdate) {
      setOldEmployee(data);
      }
      setSuccess(`${data.name} loaded successfully`);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container mx-auto py-8 px-40">
      <div className="mb-8 flex items-center justify-between gap-12">
        <div>
        <button
          className={`p-6 mr-4 rounded ${view === 'Add' ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
          onClick={() => updateView('Add')}> Add Employee
        </button>
        <button 
          className={`p-6 mr-4 rounded ${view === 'Update' ? 'bg-blue-500 text-white' : 'bg-gray-400'}`} 
          onClick={() => updateView('Update')}> Update Employee 
        </button>
        <button 
          className={`p-6 rounded ${view === 'Promote' ? 'bg-blue-500 text-white' : 'bg-gray-400'}`} 
          onClick={() => updateView('Promote')}> Promote Employee
        </button>
        </div>
          <div className='flex'>
            <input type="number" placeholder="Search by ID" className={`border border-gray-300 rounded p-2 ${view === 'Add' ? 'cursor-not-allowed' : ''}`} disabled={view === 'Add'} value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
            <button className={`bg-blue-500 text-white rounded px-4 py-2 mx-2 ${view === 'Add' ? 'cursor-not-allowed bg-gray-400 text-black' : ''}`} onClick={handleSearch} disabled={view === 'Add'}>Search</button>
        </div>
      </div>

      {view === 'Add' && (
        <EmployeeForm employee={newEmployee} setEmployee={setNewEmployee} handleSubmit={handleAddEmployee} error={error} success={success} jobs={jobs} offices={offices} view={view}/>
      )}

      {view === 'Update' && (
        <EmployeeForm employee={oldEmployee} setEmployee={setOldEmployee} handleSubmit={handleUpdate} error={error} success={success} jobs={jobs} offices={offices} view={view}/>
      )}

      {view === 'Promote' && (
        <PromoteForm employee={oldEmployee} handlePromote={handlePromote} error={error} success={success} view={view} percentage={percentage} setPercentage={setPercentage}/>
      )}

    </div>
  );
};

export default Management;