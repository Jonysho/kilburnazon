import React, { useEffect } from 'react';
import LeaveRequests from '../components/LeaveRequests';

const Dashboard = ({setNotifications}) => {
    useEffect(() => {
        setNotifications(0);
    }, []);

    return (
        <div className="container mx-auto p-4 text-white">
            <LeaveRequests />
        </div>
    );
};

export default Dashboard;