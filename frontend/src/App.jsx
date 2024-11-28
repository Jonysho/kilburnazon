import React, { useState } from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import Management from './components/Management';
import Profile from './components/Profile';
import Report from './components/Report';
import Birthday from './components/Birthday';
import Leave from './components/Leave';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'employee':
                return <EmployeeDirectory/>;
            case 'management':
                return <Management />;
            case 'profile':
                return <Profile />;
            case 'report':
                return <Report />;
            case 'birthday':
                return <Birthday />;
            case 'leave':
                return <Leave />;
            default:
                return <EmployeeDirectory />;
        }
    };

    return (
        <div className="App flex ">
            <div className="flex items-center justify-center min-h-screen" >
            <nav className="flex flex-col p-20 border-r border-gray-300">
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('profile')}>Profile</button>
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('employee')}>Employee</button>
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('management')}>Management</button>
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('report')}>Report</button>
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('birthday')}>Birthday</button>
                <button className="mb-8 p-8 border border-gray-300 rounded bg-gray-200" onClick={() => setCurrentPage('leave')}>Leave</button>
            </nav>
            </div>
            <div className="p-20 flex-1">
                {renderPage()}
            </div>
        </div>
    );
};

export default App;