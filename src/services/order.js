import api from './config/API/index';

const fetch = {
    getAllOrder: async () => {
        let response = await api.get(`orders`);
        return response;
    },
    getDetailOrder: async (orderId) => {
        let response = await api.get(`detailorder/order/${orderId}`);
        return response;
    },
    // getPersonalOrder: async (userId) => {
    //     let response = await api.get(`orders/user/${userId}`);
    //     return response;
    // },
    createOrder: async (order) => {
        let response = await api.post(`orders/add`, order);
        return response;
    },
    addDetailOrder: async (orderItem) => {
        let response = await api.post(`/detailorder/add`, orderItem);
        return response;
    },
    // updateOrder: async (orderId) => {
    //     let response = await api.put(`orders/${orderId}`);
    //     return response;
    // },
    // updateStatusOrder: async (orderId) => {
    //     let response = await api.put(`orders/status/${orderId}`);
    //     return response;
    // },
    // deleteOrder: async (orderID) => {
    //     let response = await api.delete(`orders/order/${orderID}`);
    //     return response;
    // },
};

export default fetch;
