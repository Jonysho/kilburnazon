import React, { useState } from 'react';
import EmployeeDirectory from './pages/Employee';
import Management from './pages/Management';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Birthday from './pages/Birthday';
import Leave from './pages/Leave';
import Audit from './pages/Audit';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState('Manager');

    const switchUser = () => {
        if (user === 'Manager') {
            setUser('Employee');
            setCurrentPage('home');
        } else {
            setUser('Manager');
        }
    }

    const [notifications, setNotifications] = useState(0);
    
    const renderPage = () => {
        switch (currentPage) {
            case 'employee':
                return <EmployeeDirectory/>;
            case 'management':
                return <Management />;
            case 'dashboard':
                return <Dashboard setNotifications={setNotifications}/>;
            case 'report':
                return <Report />;
            case 'birthday':
                return <Birthday />;
            case 'leave':
                return <Leave notifications={notifications} setNotifications={setNotifications}/>;
            case 'audit':
                return <Audit />;
            default:
                return <EmployeeDirectory />;
        }
    };

    return (
        <div className="App flex min-h-screen h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-[length:200%_200%] animate-gradient-move font-semibold">
            <nav className="flex flex-col p-5 border-r border-gray-300 top-3 left-3 h-full min-w-52">
                <button className="mb-7 p-2 border-2 border-white rounded text-white bg-gradient-to-r from-purple-700 to-pink-700 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-800 hover:to-pink-800" onClick={switchUser}>Switch User</button>
                { user === 'Manager' ? <button className="relative mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('dashboard')}>
                    Dashboard
                    {notifications > 0 ? <span className="absolute top-0 right-0 inline-flex items-center justify-center px-3 py-2 text-md font-bold leading-none text-red-1000 bg-red-600 rounded-full">{notifications}</span> : null}
                </button> : null }
                <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('employee')}>Employee</button>
                { user === 'Manager' ? <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('management')}>Management</button> : null }
                { user === 'Manager' ? <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('report')}>Report</button> : null }
                { user === 'Manager' ? <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('audit')}>Audit</button> : null}
                <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('birthday')}>Birthday</button>
                <button className="mb-7 p-8 border-2 border-white rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" onClick={() => setCurrentPage('leave')}>Leave</button>
            </nav>
            <div className="flex-1 overflow-y-auto p-10 overflow-x-hidden">
                {renderPage()}
            </div>
        </div>
    );
};

export default App;
