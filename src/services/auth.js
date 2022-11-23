import api from './config/API/index';

const fetch = {
    login: async (account) => {
        let response = await api.post(`auth/signin`, account);
        return response;
    },
    register: async (email, password, role) => {
        let response = await api.post(`auth/signup`, { email, password, role });
        return response;
    },
};

export default fetch;
