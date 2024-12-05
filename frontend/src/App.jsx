import React, { useState } from 'react';
import EmployeeDirectory from './pages/Employee';
import Management from './pages/Management';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Birthday from './pages/Birthday';
import Leave from './pages/Leave';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'employee':
                return <EmployeeDirectory/>;
            case 'management':
                return <Management />;
            case 'dashboard':
                return <Dashboard />;
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
        <div className="App flex min-h-screen h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-[length:200%_200%] animate-gradient-move">
        {/* <div className="App flex min-h-screen h-screen w-full bg-gradient-to-r from-gray-800 via-purple-900 to-black     bg-[length:200%_200%] animate-gradient-move"> */}
            <nav className="flex flex-col p-5 border-r border-gray-300 top-3 left-3 h-full">
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('employee')}>Employee</button>
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('management')}>Management</button>
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('report')}>Report</button>
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('birthday')}>Birthday</button>
                <button className="mb-8 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl" onClick={() => setCurrentPage('leave')}>Leave</button>
            </nav>
            <div className="flex-1 overflow-y-auto p-10 overflow-x-hidden">
                {renderPage()}
            </div>
        </div>
    );
};

export default App;