import api from './config/API/index';

const fetch = {
    getRating: async (productId) => {
        let response = await api.get(`rating/${productId}/rating`);
        return response;
    },
    createRating: async (productId) => {
        let response = await api.post(`rating/${productId}/rating`);
        return response;
    },
};

export default fetch;
