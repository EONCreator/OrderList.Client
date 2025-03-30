<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useOrderList } from './orderListTable';

    import { 
        ToolBar, 
        ToolBarItem, 
        Table, 
        BaseButton, 
        BaseCombobox, 
        BaseInput, 
        BaseDate,
        BaseTime
    } from '@/shared/ui';

    import { findFilterByColumn } from '@/shared/types/filter';

    const columns = ref([
        { name: 'First name', key: 'firstName', sortable: true },
        { name: 'Address', key: 'address', sortable: true },
        { name: 'Product', key: 'product', sortable: true },
        { name: 'Delivery date', key: 'deliveryDate', sortable: true },
        { name: 'Delivery time', key: 'deliveryTime', sortable: true },
        { name: 'Delivery type', key: 'deliveryType', sortable: false },
        { name: 'Notification', key: 'notification', sortable: false }
    ]);

    const {
        filters,
        sortDefinition,

        currentPage,
        pageSize,
        
        fetchOrders
    } = useOrderList();

    const products = ["", "Samsung Galaxy S11", "iPhone 16", "Apple Watch"];
</script>

<template>
    <ToolBar>
        <ToolBarItem>
            <BaseInput 
                small 
                placeholder="First name"
                v-model="findFilterByColumn(filters, 'firstName')!.value" />
        </ToolBarItem>
        <ToolBarItem>
            <BaseInput 
                small 
                placeholder="Address"
                v-model="findFilterByColumn(filters, 'address')!.value" />
        </ToolBarItem>
        <ToolBarItem>
            <BaseCombobox 
                small 
                :values="products"
                v-model="findFilterByColumn(filters, 'product')!.value" />
        </ToolBarItem>
        <ToolBarItem>
            <BaseDate 
                small
                v-model="findFilterByColumn(filters, 'deliveryDate')!.value" />
        </ToolBarItem>
        <ToolBarItem>
            <BaseTime 
                small
                v-model="findFilterByColumn(filters, 'deliveryTime')!.value" />
        </ToolBarItem>
        <ToolBarItem>
            <RouterLink to="/addorder">
                <BaseButton small text="Add order" />
            </RouterLink>
        </ToolBarItem>
    </ToolBar>

    <Table 
        :columns="columns"
        :dataLoader="fetchOrders"
        :filters="filters"
        :sortDefinition="sortDefinition"
        :currentPage="currentPage"
        :pageSize="pageSize"></Table>
</template>