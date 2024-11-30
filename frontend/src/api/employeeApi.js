import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees: ', error);
        throw error;
    }
};

export const getEmployeesData = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data: ', error);
        throw error;
    }
}