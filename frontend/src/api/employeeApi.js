import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees: ', error);
        throw error;
    }
};

const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/employees`, {
            params: { id: id }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data: ', error);
        throw error;
    }
}

const addEmployee = async (employee) => {
    const { name, job, email, salary, dob, hired_date, home_address, contract, nin } = employee;

    employee.name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();

    if (!name) {throw new Error('Name is required')}
    if (!job) {throw new Error('Job title is required')}
    if (!email) {throw new Error('Email is required')}
    if (!salary) {throw new Error('Salary is required')}
    if (!dob) {throw new Error('Date of birth is required')}
    if (!hired_date) {throw new Error('Start date is required')}
    if (!home_address) {throw new Error('Home Address is required')}
    if (!contract) {throw new Error('Contract is required')}
    if (!nin) {throw new Error('National Insurance Number is required')}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    employee.email = email;

    employee.nin = nin.toUpperCase();

    try {
        const response = await axios.post(`${API_URL}/employees`, employee);
        return response.data;
    } catch (error) {
        console.error('Error adding employee: ', error);
        throw new Error('Error adding employee');
    }
}

const updateEmployee = async (employee) => {
    const { employee_id, name, job, email, salary, dob, hired_date, home_address, contract, nin } = employee;

    console.log(employee);
    employee.name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();
    if (!name) {throw new Error('Name is required')}
    if (!job) {throw new Error('Job title is required')}
    if (!email) {throw new Error('Email is required')}
    if (!salary) {throw new Error('Salary is required')}
    if (!dob) {throw new Error('Date of birth is required')}
    if (!hired_date) {throw new Error('Start date is required')}
    if (!home_address) {throw new Error('Home Address is required')}
    if (!contract) {throw new Error('Contract is required')}
    if (!nin) {throw new Error('National Insurance Number is required')}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    employee.email = email;

    employee.nin = nin.toUpperCase();

    try {
        const response = await axios.put(`${API_URL}/employees`, employee, { id: employee_id });
        return response.data;
    } catch (error) {
        console.error('Error updating employee: ', error);
        throw new Error('Error updating employee');
    }
}

const promoteEmployee = async (id, percentage) => {
    if (!id) {throw new Error('Employee is required')}
    if (!percentage) {throw new Error('Promotion percentage is required')}
    try {
        const response = await axios.post(`${API_URL}/employees/promote`, { id, percentage });
        return response.data;
    } catch (error) {
        throw new Error('Error promoting employee');
    }
}

const requestLeave = async (employee_id, leave_type, start_date, end_date, reason ) => {
    if (!employee_id) {throw new Error('Employee is required')}
    if (!leave_type) {throw new Error('Leave type is required')}
    if (!start_date) {throw new Error('Start date is required')}
    if (!end_date) {throw new Error('End date is required')}
    try {
        const response = await axios.post(`${API_URL}/employees/leave/request`, { employee_id, leave_type, start_date, end_date, reason });
        return response.data;
    } catch (error) {
        console.error('Error requesting leave: ', error);
        throw new Error('Error requesting leave');
    }
}

export { getEmployees, getEmployeeById, addEmployee, updateEmployee, promoteEmployee, requestLeave};