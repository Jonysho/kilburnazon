import React, { useState, useEffect } from 'react';

const LeaveRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch leave requests from the backend
        fetch('/api/leave-requests')
            .then(response => response.json())
            .then(data => setRequests(data));
    }, []);

    const handleApprove = (id) => {
        // Approve leave request
        fetch(`/api/leave-requests/${id}/approve`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                // Update the request list
                setRequests(requests.map(req => req.id === id ? { ...req, status: 'approved' } : req));
            });
    };

    const handleDeny = (id) => {
        // Deny leave request
        fetch(`/api/leave-requests/${id}/deny`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                // Update the request list
                setRequests(requests.map(req => req.id === id ? { ...req, status: 'denied' } : req));
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Leave Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request.id} className="mb-4 p-4 border rounded">
                        <p><strong>Employee:</strong> {request.employeeName}</p>
                        <p><strong>Leave Type:</strong> {request.leaveType}</p>
                        <p><strong>Start Date:</strong> {request.startDate}</p>
                        <p><strong>End Date:</strong> {request.endDate}</p>
                        <p><strong>Comments:</strong> {request.comments}</p>
                        <p><strong>Status:</strong> {request.status}</p>
                        {request.status === 'pending' && (
                            <div>
                                <button onClick={() => handleApprove(request.id)} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={() => handleDeny(request.id)} className="bg-red-500 text-white p-2 rounded">Deny</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveRequests;