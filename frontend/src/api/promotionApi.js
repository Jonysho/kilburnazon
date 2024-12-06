import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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

const getPromotions = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees/promotions`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching promotions');
    }
}

export { promoteEmployee, getPromotions };