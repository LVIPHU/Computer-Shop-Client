import api from './config/API/index';

const fetch = {
    login: async (email, password) => {
        let response = await api.post(`auth/signin`, { email, password });
        return response;
    },
    register: async (email, password, role) => {
        let response = await api.post(`auth/signup`, { email, password, role });
        return response;
    },
};

export default fetch;
