import React, { useState } from 'react';
import { requestLeave } from '../api/leaveApi';

const Leave = ({notifications, setNotifications}) => {
    const [employeeID, setEmployeeID] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resetInfo = () => {
        setEmployeeID('');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
    }

    const handleSubmit = async (e) => {
      setError(null);
      setSuccess(null);
      e.preventDefault();
      console.log(employeeID, leaveType, startDate, endDate, reason);
      try {
          await requestLeave(employeeID, leaveType, startDate, endDate, reason)
          resetInfo();
          setSuccess('Leave request submitted successfully');
          setNotifications(notifications + 1);
      } catch (error) {
        setError(error.message);
      }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-">
            <div className="mb-4">
                <label className="block text-white">Employee ID</label>
                <input type="text" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-white">Leave Type</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="border p-2 rounded w-full">
                    <option value="">Select Leave Type</option>
                    <option value="Sick">Sick</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-white">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-white">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
                <label className="block text-white">reason</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="border p-2 rounded w-full"></textarea>
            </div>
            <div className="items-center">
              <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Submit Request</button>
              {error ? <p className="text-red-500 absolute mt-4">{error}</p> : null}
              {success ? <p className="text-green-500 absolute mt-4">{success}</p> : null}
             </div>
        </form>

    );
};

export default Leave;