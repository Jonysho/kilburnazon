import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getAuditLogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/audit`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees: ', error);
        throw error;
    }
};

export { getAuditLogs };