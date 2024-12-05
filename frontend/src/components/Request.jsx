const Request = ({ requests, handleApprove, handleReject }) => {
    return (
        <div>
            <ul>
                {requests.map(request => (
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
        </div>
    )
};

export default Request;