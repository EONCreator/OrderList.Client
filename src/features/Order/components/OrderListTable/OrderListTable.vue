<script setup lang="ts">
    import { ref } from 'vue';
    import { useOrderList } from './orderListTable';
    import { Table, } from '@/shared/ui';
    import OrderListToolbar from './components/toolbar/OrderListToolbar.vue';

    const columns = ref([
        { name: 'First name', key: 'firstName', sortable: true },
        { name: 'Address', key: 'address', sortable: true },
        { name: 'Product', key: 'product', sortable: true },
        { name: 'Delivery date', key: 'deliveryDate', sortable: true },
        { name: 'Delivery time', key: 'deliveryTime', sortable: true },
        { name: 'Delivery type', key: 'deliveryType', sortable: false },
        { name: 'Notification', key: 'notification', sortable: false },
        { name: 'Date created', key: 'dateCreated', sortable: true }
    ]);

    const {
        filters,
        sortDefinition,

        currentPage,
        pageSize,
        
        fetchOrders
    } = useOrderList();
</script>

<template>
    <OrderListToolbar 
        :filters="filters"
        @onFilterChange="fetchOrders" />
    <Table 
        :columns="columns"
        :dataLoader="fetchOrders"
        :filters="filters"
        :sortDefinition="sortDefinition"
        :currentPage="currentPage"
        :pageSize="pageSize"></Table>
</template>