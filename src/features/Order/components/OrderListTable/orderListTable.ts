import { ref } from 'vue';
import { orderService } from './../../services/OrderService';
import type { Order } from '@/entities';
import { SortDirection, type SortDefinition } from '@/shared/types/sortDefinition';
import type { Filter } from '@/shared/types/filter';

export const useOrderList = () => {
    const orders = ref<Order[]>([]);

    const filters = ref<Filter[]>([
        { column: 'firstName', type: "String", value: "" },
        { column: 'address', type: "String", value: "" },
        { column: 'product', type: "String", value: "" },
        { column: 'deliveryDate', type: "Date", value: "" },
        { column: 'deliveryTime', type: "Date", value: "" },
    ]);

    const sortDefinition = ref<SortDefinition>({
        column: 'deliveryDate',
        type: SortDirection.Descending,
    });

    const currentPage = ref<number>(1);
    const pageSize = ref<number>(5);
    const errorMessage = ref<string | null>(null);

    const fetchOrders = async (pageNumber: number) => {
        errorMessage.value = null;
        try {
            const response = await orderService.getOrders(
                filters.value,
                sortDefinition.value,
                pageNumber,
                pageSize.value
            );
            return {
                items: response.items.map(({ _id, ...order }) => order),
                totalPages: response.totalPages
            }
        } catch (error) {
            handleFetchError(error);
            return
        }
    };

    const handleFetchError = (error: unknown) => {
        errorMessage.value = 'Не удалось загрузить заказы. Пожалуйста, попробуйте позже.';
    };

    return {
        orders,
        filters,
        sortDefinition,
        currentPage,
        pageSize,
        errorMessage,
        fetchOrders
    };
};