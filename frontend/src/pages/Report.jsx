import React, { useState, useEffect } from 'react';
import Payroll from '../components/Payroll';
import { generateReport } from '../api/reportApi';

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const [customRange, setCustomRange] = useState({ start: '1900-01-01', end: '2100-12-31' });
    const [period, setPeriod] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form submission (for generating report)
    const handlePreview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setReportData([]);
        var data;  
        try {
            data = await generateReport(customRange.start, customRange.end);
            setSuccess("Report generated successfully");
        } catch (error) {
            console.error('Error generating report: ', error);
            setError("Error generating report");
        }
        setTimeout(() => {
            setReportData(data);
            setIsLoading(false);
        }, 2000);
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
        setCustomRange({start: '1900-01-01', end: '2100-12-31' });
    };

    const handleMonthSelect = (e) => {
        const month = e.target.value;
        setCustomRange({ start: `2024-${month}-01`, end: `2024-${month}-31` });
    }

    const handleYearSelect = (e) => {
        const year = e.target.value;
        setCustomRange({ start: `${year}-01-01`, end: `${year}-12-31` });
    }

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setCustomRange({ ...customRange, [name]: value });
    };

    return (
        <div className="container mx-auto rounded p-6">
            <div className="mb-0 text-center text-white">
                <h1 className="text-6xl font-bold">Reports</h1>
            </div>
            <div className='p-4 text-center text-white flex justify-between items-center mb-8'>
                    <div className="flex items-center justify-center">
                        <select value={period} onChange={handlePeriodChange} className="mr-4 p-2 border rounded text-black cursor-pointer hover:bor0">
                            <option value="all">All-Time</option>
                            <option value="yearly">Yearly</option>
                            <option value="monthly">Monthly (2024)</option>
                            <option value="custom">Custom Range</option>
                        </select>
                        {period === "yearly" && (
                            <div>
                                {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                                    <label key={index} className="mr-4">
                                        <input type="radio" name="year" value={year} onChange={handleYearSelect} className="mr-2"/>
                                        {year}
                                    </label>
                                ))}
                            </div>
                        )}
                        {period === "monthly" && (
                            <div>
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                    <label key={index} className="mr-6">
                                        <input type="radio" name="month" value={String(index + 1).padStart(2, '0')} onChange={handleMonthSelect} className="mr-1"/>
                                        {month}
                                    </label>
                                ))}
                            </div>
                        )}
                        {period === "custom" && (
                            <div>
                                <label className="mr-2">Start Date:</label>
                                <input type="date" name="start" onChange={handleDateChange} className="mr-4 p-1 border rounded text-black" />
                                <label className="mr-2">End Date:</label>
                                <input type="date" name="end" onChange={handleDateChange} className="p-1 border rounded text-black" />
                            </div>
                        )}
                    </div>
                <button className='p-2 bg-green-500 hover:bg-green-600 rounded' type="submit" onClick={handlePreview}>Preview Report</button>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <div className='bg-gray-50 rounded text-white p-6'>
                <Payroll data={reportData} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Report;
