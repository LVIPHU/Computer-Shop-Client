import api from './config/API/index';

const config = {
    headers: {
        'Content-Type': 'application/json',
        authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaW5oa2hhbmcxNTExQGdtYWlsLmNvbSIsImlhdCI6MTY2OTgzMjU1MiwiZXhwIjoxNjY5OTE4OTUyfQ.xHBdVs2Uv3NRaqjaYinCrICzS0y_jB6WUEz3TTJopBNIDUAvaIqudt9CZfD0l_86QsdeDKSAP3pBzyX3G72VXg',
    },
};

const fetch = {
    getAllCategory: async () => {
        let response = await api.get(`category`, config);
        return response;
    },
    getDetailCategory: async (id) => {
        let response = await api.get(`category/${id}`);
        return response;
    },
    createCategory: async (category) => {
        let response = await api.post(`category`, category);
        return response;
    },
    updateCategory: async (id, category) => {
        let response = await api.put(`category/${id}`, category);
        return response;
    },
    deleteCategory: async (id) => {
        let response = await api.delete(`category/${id}`);
        return response;
    },
};

export default fetch;
