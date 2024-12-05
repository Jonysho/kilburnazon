import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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

const getRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees/leave/request`);
        return response.data;
    } catch (error) {
        console.error('Error fetching requests: ', error);
        throw error;
    }
}

const approveRequest = async (request_id) => {
    try {
        const response = await axios.put(`${API_URL}/employees/leave/request/approve`, request_id);
        return response.data;
    } catch (error) {
        console.error('Error approving request: ', error);
        throw error;
    }
}

const rejectRequest = async (request_id) => {
    try {
        const response = await axios.put(`${API_URL}/employees/leave/request/reject`, request_id);
        return response.data;
    } catch (error) {
        console.error('Error approving request: ', error);
        throw error;
    }
}

export { requestLeave, getRequests, approveRequest, rejectRequest };