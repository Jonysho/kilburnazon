import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { getRequestsData } from '../api/leaveApi';
import BarChartQ from './BarChartQ';

// Registering required components for both bar chart and pie chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // for pie chart
  RadialLinearScale // for pie chart
);

const AbsenceReport = ({fetchData, customRange, setCustomRange, quarterlyData, departmentData, period, setPeriod}) => {

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
        setCustomRange({start: '1900-01-01', end: '2100-12-31' });
    };

    const handleYearSelect = (e) => {
        const year = e.target.value;
        setCustomRange({ start: `${year}-01-01`, end: `${year}-12-31` });
    }

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setCustomRange({ ...customRange, [name]: value });
    };

    return (
        <div className='p-4 text-center'>
            <div className='flex flex-col items-center text-center'>
                <h1 className="text-2xl mb-4">Absence Report</h1>
                <div className="mb-4 flex items-center justify-center">
                    <select value={period} onChange={handlePeriodChange} className="mr-4 p-2 border rounded text-black">
                        <option value="all">All-Time</option>
                        <option value="yearly">Yearly</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    {period === "yearly" && (
                        <div>
                            {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                                <label key={index} className="mr-4">
                                    <input type="radio" name="quarter" value={year} onChange={handleYearSelect} className="mr-2"/>
                                    {year}
                                </label>
                            ))}
                        </div>
                    )}
                    {period === "custom" && (
                        <div>
                            <label className="mr-2">Start Date:</label>
                            <input type="date" name="start" onChange={handleDateChange} className="mr-4 p-1 border rounded" />
                            <label className="mr-2">End Date:</label>
                            <input type="date" name="end" onChange={handleDateChange} className="p-1 border rounded" />
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center'>
                <BarChartQ data={quarterlyData} />
                <PieChart data={departmentData} />
            </div>
        </div>
    )
}

export default AbsenceReport;