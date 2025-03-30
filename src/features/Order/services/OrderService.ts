import axios from 'axios';
import type { Filter } from '@/shared/types/filter';
import type { SortDefinition } from '@/shared/types/sortDefinition';
import type { Order } from '@/entities';
import type { TableResponse } from '@/shared/types/tableResponse';

const API_URLS = {
    baseUrl: 'http://localhost:8080/Orders',
    endpoints: {
        createOrder: '/CreateOrder',
        getOrders: '/GetOrders',
    },
};

class OrderService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080/Orders';
    }

    public async createOrder(orderData: Order): Promise<any> {
        try {
            const response = await axios.post(this.baseUrl + API_URLS.endpoints.createOrder, orderData);
            return response.data;
        } catch (error) {
            console.error('Error sending order:', error);
            throw error;
        }
    }

    public async getOrders(
        filters: Filter[],
        sortDefinition: SortDefinition, 
        pageNumber: number, 
        pageSize: number): Promise<TableResponse<Order>> {
        try {
            const response = await axios.post(this.baseUrl + API_URLS.endpoints.getOrders,
                {
                    filters,
                    sortDefinition,
                    pageNumber,
                    pageSize
                });

            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
}

export const orderService = new OrderService();
