import React, { useEffect, useState } from 'react';
import LeaveRequests from '../components/LeaveRequests';
import AbsenceReport from '../components/AbsenceReport';
import { getRequestsData } from '../api/leaveApi';

const Dashboard = ({setNotifications}) => {
    const [customRange, setCustomRange] = useState({ start: '1900-01-01', end: '2100-12-31' });
    const [quarterlyData, setQuarterlyData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [period, setPeriod] = useState('all');

    useEffect(() => {
        fetchData();
    }, [period, customRange]);

    const fetchData = () => {
        getRequestsData(customRange.start, customRange.end, "quarter").then(data => {
            setQuarterlyData((data));
        });
        getRequestsData(customRange.start, customRange.end, "department").then(data => {
            setDepartmentData(data);
        });
    };

    useEffect(() => {
        fetchData();
        setNotifications(0);
    }, []);
    

    return (
        <div className="container mx-auto p-4 text-white">
            <div className='bg-slate-900 rounded mb-10'>
                <AbsenceReport customRange={customRange} setCustomRange={setCustomRange} quarterlyData={quarterlyData} departmentData={departmentData} period={period} setPeriod={setPeriod}/>
            </div>
            <div className='bg-slate-900 rounded'>
                <LeaveRequests fetchData={fetchData}/>
            </div>
        </div>
    );
};

export default Dashboard;