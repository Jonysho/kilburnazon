import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box, CircularProgress } from '@mui/material';
import { getDepartments, getJobs } from '../api/infoApi';
import { exportToCSV, exportToPDF } from '../export';

const Payroll = ({ data, isLoading }) => {
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState([0, 1000000]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getDepartments().then(data => setDepartments(data));
        getJobs().then(data => setJobs(data));
    }, []);

    // Filter data based on the selected filters
    const filteredData = data.filter(item => {
        const inSalaryRange = item.base_salary >= salaryFilter[0] && item.base_salary <= salaryFilter[1];
        const matchesDepartment = departmentFilter ? item.department_name === departmentFilter : true;
        const matchesJob = jobFilter ? item.job_title === jobFilter : true;
        return matchesDepartment && matchesJob && inSalaryRange;
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const resetFilters = () => {
        setDepartmentFilter('');
        setJobFilter('');
        setSalaryFilter([0, 1000000]);
    };

    return (
    <div>
        <div className='flex justify-between items-center'>
            <div className='flex'>
            <div className='mr-4'>
                <FormControl className='mr-4 w-64'>
                    <InputLabel>Department</InputLabel>
                    <Select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                    <MenuItem value="">All</MenuItem>
                    {departments.map((dep) => (
                        <MenuItem key={dep.department_id} value={dep.name}>{dep.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div className='mr-4'>
                <FormControl className='w-64'>
                    <InputLabel>Job</InputLabel>
                    <Select
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                    >
                    <MenuItem value="">All</MenuItem>
                    {jobs.map((job) => (
                        <MenuItem key={job.position_id} value={job.name}>{job.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div className='flex items-center mr-4'>
                <TextField 
                type="number"
                label="Min Salary"
                value={salaryFilter[0]}
                onChange={(e) => setSalaryFilter([+e.target.value, salaryFilter[1]])}
                style={{ marginRight: '1rem' }}
                />
                <TextField
                type="number"
                label="Max Salary"
                value={salaryFilter[1]}
                onChange={(e) => setSalaryFilter([salaryFilter[0], +e.target.value])}
                />
            </div>
                    
            <Button variant="contained" color="secondary" onClick={resetFilters}>
                Reset Filters
            </Button>
        </div>
        <div className='flex items-center'>
        <Button
            variant="contained"
            sx={{backgroundColor: '#3f51b5', maxWidth: '5rem'}}
            onClick={() => exportToCSV(filteredData)}
            >
            Export to CSV
        </Button>
        <Button
            variant="contained"
            sx={{backgroundColor: '#3f51b5', marginLeft: '1rem', maxWidth: '5rem'}}
            onClick={() => exportToPDF(filteredData)}
            >
            Export to PDF
        </Button>
        </div>
        </div>
        
        {/* Show loading spinner */}
        {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-white">
                <CircularProgress color="inherit" />
                <span>Loading...</span>
            </div>
        )}

        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >No.</TableCell>
                        <TableCell >ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Dpt. Name</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Base Salary</TableCell>
                        <TableCell>Bonuses</TableCell>
                        <TableCell>Incentives</TableCell>
                        <TableCell>Other Allowances</TableCell>
                        <TableCell>Tax Deductions</TableCell>
                        <TableCell>Insurance Deductions</TableCell>
                        <TableCell>Retirement Contributions</TableCell>
                        <TableCell>Net Pay</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={row.employee_id}>
                            <TableCell>{(index + 1) + (page*rowsPerPage)}</TableCell>
                            <TableCell>{row.employee_id}</TableCell>
                            <TableCell>{row.employee_name}</TableCell>
                            <TableCell>{row.department_name}</TableCell>
                            <TableCell>{row.job_title}</TableCell>
                            <TableCell>{row.base_salary ? '£'+row.base_salary.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_bonuses ? '£'+row.total_bonuses.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_incentives ? '£'+row.total_incentives.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_other_allowances ? '£'+row.total_other_allowances.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_tax_deductions ? '£'+row.total_tax_deductions.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_insurance_deductions ? '£'+row.total_insurance_deductions.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.total_retirement_contributions ? '£'+row.total_retirement_contributions.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{row.net_pay ? '£'+row.net_pay.toLocaleString() : 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
    );
    };

    export default Payroll;
