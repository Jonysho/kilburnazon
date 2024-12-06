import React, { useState, useEffect } from 'react';
import { approveRequest, getRequests, rejectRequest } from '../api/leaveApi';

const LeaveRequests = ({fetchData}) => {
    const [requests, setRequests] = useState([]);
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        getRequests().then(data => setRequests(data));
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveRequest(id);
            getRequests().then(data => setRequests(data));
            fetchData();
        } catch (error) {
          alert("Error approving request");
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectRequest(id);
            getRequests().then(data => setRequests(data));
            fetchData();
        } catch (error) {
          alert("Error rejecting request");
        }
    }

    const filterRequests = () => {
        return requests.filter(request => request.status === status);
    }

    return (
        <div className="container mx-auto p-4">
            <div className='flex items-center mb-4 justify-between'>
                <h2 className="text-2xl mr-4">Leave Requests</h2>
                <div className='flex items-center'>
                <select name="type" value={status} onChange={(e) => setStatus(e.target.value)} className='text-black border border-gray-300 ounded mr-4'>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <p className="text-gray-700">Showing {filterRequests().length} requests</p>
                </div>
            </div>
                {status === 'Pending' && (
                <>
                    <h3 className="text-xl mb-4">{status} Requests</h3>
                    <ul>
                        {filterRequests().map(request => (
                            <li key={request.id} className="mb-4 p-4 border rounded flex justify-between">
                                <div>
                                <p><strong>Employee:</strong> {request.name}</p>
                                <p><strong>Leave Type:</strong> {request.leave_type}</p>
                                <p><strong>Start Date:</strong> {new Date(request.start_date).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(request.end_date).toLocaleDateString()}</p>
                                <p><strong>Number of Days:</strong> {Math.ceil((new Date(request.end_date) - new Date(request.start_date)) / (1000 * 60 * 60 * 24))}</p>
                                <p><strong>Reason:</strong> {request.reason}</p>
                                <p><strong>Status:</strong> {request.status}</p>
                                <p><strong>Date Requested:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
                                </div>
                                {request.status === 'Pending' && (
                                <div>
                                    <button onClick={() => handleApprove(request.id)} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                    <button onClick={() => handleReject(request.id)} className="bg-red-500 text-white p-2 rounded">Reject</button>
                                </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
                )}
        </div>
    );
};

export default LeaveRequests;