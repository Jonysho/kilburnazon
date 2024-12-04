import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getDepartments = async () => {
    try {
        const response = await axios.get(`${API_URL}/info/departments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments: ', error);
        throw error;
    }
};

const getLocations = async () => {
    try {
        const response = await axios.get(`${API_URL}/info/locations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations: ', error);
        throw error;
    }
};

const getJobs = async () => {
    try {
        const response = await axios.get(`${API_URL}/info/jobs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations: ', error);
        throw error;
    }
};

const getOffices = async () => {
    try {
        const response = await axios.get(`${API_URL}/info/offices`);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations: ', error);
        throw error;
    }
};

export { getDepartments, getLocations, getJobs, getOffices };