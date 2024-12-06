import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const generateReport = async (start, end) => {
    if (!start) {throw new Error('Start date is required')}
    if (!end) {throw new Error('End date is required')}
    try {
        const response = await axios.get(`${API_URL}/report`, {params: { start, end }});
        return response.data;
    } catch (error) {
        console.error('Error generating report: ', error);
        throw error;
    }
}

export { generateReport };