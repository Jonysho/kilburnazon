import React, { useState, useEffect } from 'react';

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const [filters, setFilters] = useState({
        department: '',
        role: '',
        salaryRange: [0, 1000000], // Salary range filter
        timePeriod: 'monthly', // Default: Monthly
    });

    const [loading, setLoading] = useState(false);

    // Handle form submission (for generating report)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Fetch the report data from the backend (API)
        const response = await fetch(`/api/report?timePeriod=${filters.timePeriod}&department=${filters.department}&role=${filters.role}&salaryMin=${filters.salaryRange[0]}&salaryMax=${filters.salaryRange[1]}`);
        const data = await response.json();
        setReportData(data);
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4 text-white">
            <div className="mb-4">
                <h2>Payroll Report</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Time Period</label>
                    <select
                        value={filters.timePeriod} onChange={(e) => setFilters({ ...filters, timePeriod: e.target.value })} className='text-black'>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label>Department</label>
                    <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} className='text-black'>
                        <option value="">All</option>
                        {/* Add other department options dynamically */}
                    </select>
                </div>

                <div className="mb-4">
                    <label>Role</label>
                     <select value={filters.role}onChange={(e) => setFilters({ ...filters, role: e.target.value })} className='text-black'>
                        <option value="">All</option>
                        {/* Add other role options dynamically */}
                    </select>
                </div>

                <div className="mb-4">
                    <label>Salary Range</label>
                     <input type ="number"value={filters.salaryRange[0]}onChange={(e) => setFilters({ ...filters, salaryRange: [e.target.value, filters.salaryRange[1]] })} className='text-black'/>
                    -
                     <input type ="number"value={filters.salaryRange[1]}onChange={(e) => setFilters({ ...filters, salaryRange: [filters.salaryRange[0], e.target.value] })} className='text-black'/>
                </div>

                <button type="submit">Generate Report</button>
            </form>

            {loading && <p>Loading...</p>}

            {reportData.length > 0 && (
                <div className="report-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Job Title</th>
                                <th>Base Salary</th>
                                <th>Bonuses</th>
                                <th>Deductions</th>
                                <th>Net Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.job_title}</td>
                                    <td>{employee.base_salary}</td>
                                    <td>{employee.bonuses}</td>
                                    <td>{employee.deductions}</td>
                                    <td>{employee.net_pay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="summary">
                        <p>Total Payroll: {reportData.reduce((acc, employee) => acc + employee.net_pay, 0)}</p>
                        <p>Average Salary: {reportData.reduce((acc, employee) => acc + employee.base_salary, 0) / reportData.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;
