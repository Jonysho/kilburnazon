import React, { useState, useEffect } from 'react';
import { approveRequest, getRequests, rejectRequest } from '../api/leaveApi';
import Request from './Request';

const LeaveRequests = () => {
    const [requests, setRequests] = useState([]);
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        getRequests().then(data => setRequests(data));
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveRequest(id);
            getRequests().then(data => setRequests(data));
        } catch (error) {
          alert("Error approving request");
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectRequest(id);
            getRequests().then(data => setRequests(data));
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
                    <Request requests={filterRequests(status)} handleApprove={handleApprove} handleReject={handleReject} />
                </>
                )}
        </div>
    );
};

export default LeaveRequests;