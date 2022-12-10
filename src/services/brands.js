import api from './config/API/index';

const fetch = {
    getAllBrands: async () => {
        let response = await api.get(`brands`);
        return response;
    },
    getDetailBrands: async (id) => {
        let response = await api.get(`brands/${id}`);
        return response;
    },
    createBrands: async (brands) => {
        let response = await api.post(`brands`, brands);
        return response;
    },
    updateBrands: async (id, brands) => {
        let response = await api.put(`brands/${id}`, brands);
        return response;
    },
    deleteBrands: async (id) => {
        let response = await api.delete(`brands/${id}`);
        return response;
    },
};

export default fetch;
