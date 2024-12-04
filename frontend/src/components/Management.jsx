import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getJobs, getOffices } from '../api/infoApi';
import { addEmployee, getEmployeeById } from '../api/employeeApi';

const Management = () => {
  const [newEmployee, setNewEmployee] = useState({ name: '', job: '', office: '', email: '', salary: '', dob: '', address: '', contract: '', hired_date: '', nin: ''});
  const [updateEmployee, setUpdateEmployee] = useState({ name: '', job: '', office: '', email: '', salary: '', dob: '', address: '', contract: '', hired_date: '', nin: ''});
  const [searchId, setSearchId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [offices, setOffices] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [view, setView] = useState('add'); // State to manage which form is displayed

  useEffect(() => {
    getJobs().then(data => setJobs(data));
    getOffices().then(data => setOffices(data));
  }, [])

  useEffect(() => {
    setError(null);
    setSuccess(null);
    console.log(updateEmployee);
  }, [newEmployee, updateEmployee]);

  const resetInfo = () => {
    setNewEmployee({ name: '', job: '', office: '', email: '', salary: '', dob: '', address: '', contract: '', hired_date: '', nin: ''});
    setUpdateEmployee({ name: '', job: '', office: '', email: '', salary: '', dob: '', address: '', contract: '', hired_date: '', nin: ''});
    setSearchId('');
    setError(null);
    setSuccess(null);
  }

  const updateView = (view) => {
    setView(view);
    resetInfo();
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
        await addEmployee(newEmployee)
        // resetInfo();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await addEmployee(newEmployee)
        // resetInfo();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await getEmployeeById(searchId)
      const { name, job, office, email, salary, dob, address, contract, hired_date, nin } = data;
      setUpdateEmployee({ name, job, office, email, salary, dob, address, contract, hired_date, nin });
      console.log(name);
      setUpdateEmployee({...updateEmployee, name: name, job, office, email, salary, dob, address, contract, hired_date, nin });
      // console.log(...updateEmployee);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4 flex gap-2">
        <button
          className={`p-2 mr-8 rounded ${view === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => updateView('add')}
        >
          Add Employee
        </button>
        <button 
          className={`p-2 rounded ${view === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => updateView('update')}> Update Employee </button>
        {view === 'update' &&
          <div className='flex py-2'>
            <input type="text" placeholder="Search by ID" className="border border-gray-300 p-1 rounded mb-4" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
            <button className="bg-green-500 text-white p-2 rounded" onClick={handleSearch}>Search</button>
        </div>
        }
      </div>

      {view === 'add' && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
          <form onSubmit={handleAddEmployee}>
            <input type="text" placeholder="Name" className="border border-gray-300 p-2 rounded mb-4 w-full" value={newEmployee.name || ''} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}/>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Job Title</label>
              <select className ="border border-gray-300 p-2 rounded" value={newEmployee.job || ''} onChange={(e) => setNewEmployee({ ...newEmployee, job: e.target.value })}>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="number" min="0" placeholder="Salary" className="border border-gray-300 p-2 rounded mb-4 w-full" value={newEmployee.salary || ''} onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}/>
            <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded mb-4 w-full" value={newEmployee.email || ''} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}/>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Date of Birth</label>
             <input type="date" className="border border-gray-300 p-2 rounded"value={newEmployee.dob || ''} onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}/>
            </div>
             <select className ="border border-gray-300 p-2 rounded mb-4 w-full" value={newEmployee.office || ''} onChange={(e) => setNewEmployee({ ...newEmployee, office: e.target.value })}>
              <option value="">Select Office</option>
              {offices.map(office => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
             <input type="text" placeholder="Home Address" className="border border-gray-300 p-2 rounded mb-4 w-full"value={newEmployee.address || ''} onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}/>
             <div className='flex items-center mb-4'>
              <label className='mr-4 '>Contract</label>
              <select className ="border border-gray-300 p-2 rounded" value={newEmployee.contract || ''} onChange={(e) => setNewEmployee({ ...newEmployee, contract: e.target.value })}>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Start Date</label>
              <input type="date" className="border border-gray-300 p-2 rounded" value={newEmployee.hired_date || ''} onChange={(e) => setNewEmployee({ ...newEmployee, hired_date: e.target.value })}/>
            </div>
             <input type="text" placeholder="NI Number" className="border border-gray-300 p-2 rounded w-full mb-4"value={newEmployee.nin || ''} onChange={(e) => setNewEmployee({ ...newEmployee, nin: e.target.value })}/>
             <div className="flex items-center">
              <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Employee</button>
              {error ? <p className="text-red-500 mx-4">{error}</p> : null}
             </div>
          </form>
        </div>
      )}

      {view === 'update' && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 items-center centre">Update Employee</h2>
          <form onSubmit={handleUpdate}>
            <input type="text" placeholder="Name" className="border border-gray-300 p-2 rounded mb-4 w-full" value={updateEmployee.name || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, name: e.target.value })}/>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Job Title</label>
              <select className ="border border-gray-300 p-2 rounded" value={updateEmployee.job || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, job: e.target.value })}>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="number" min="0" placeholder="Salary" className="border border-gray-300 p-2 rounded mb-4 w-full" value={updateEmployee.salary || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, salary: e.target.value })}/>
            <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded mb-4 w-full" value={updateEmployee.email || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, email: e.target.value })}/>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Date of Birth</label>
             <input type="date" className="border border-gray-300 p-2 rounded"value={updateEmployee.dob || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, dob: e.target.value })}/>
            </div>
             <select className ="border border-gray-300 p-2 rounded mb-4 w-full" value={updateEmployee.office || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, office: e.target.value })}>
              <option value="">Select Office</option>
              {offices.map(office => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
             <input type="text" placeholder="Home Address" className="border border-gray-300 p-2 rounded mb-4 w-full"value={updateEmployee.address || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, address: e.target.value })}/>
             <div className='flex items-center mb-4'>
              <label className='mr-4 '>Contract</label>
              <select className ="border border-gray-300 p-2 rounded" value={updateEmployee.contract || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, contract: e.target.value })}>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className='flex items-center mb-4'>
              <label className='mr-4'>Start Date</label>
              <input type="date" className="border border-gray-300 p-2 rounded" value={updateEmployee.hired_date || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, hired_date: e.target.value })}/>
            </div>
             <input type="text" placeholder="NI Number" className="border border-gray-300 p-2 rounded w-full mb-4"value={updateEmployee.nin || ''} onChange={(e) => setUpdateEmployee({ ...updateEmployee, nin: e.target.value })}/>
             <div className="flex items-center">
              <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Employee</button>
              {error ? <p className="text-red-500 mx-4">{error}</p> : null}
             </div>
            <div>
            </div>
          </form>

        </div>
      )}
    </div>
  );
};

export default Management;