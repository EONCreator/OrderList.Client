<script setup lang="ts">
    import { 
        ToolBar, 
        ToolBarItem,
        BaseButton, 
        BaseCombobox, 
        BaseInput, 
        BaseDate,
        BaseTime,
        BaseCheckbox,
        ToolBarInlineGroup
    } from '@/shared/ui';

    import type { OrderListToolBarProps } from './OrderListToolbar.types';
    import { findFilterByColumn, type Filter } from '@/shared/types/filter';
    import { ref, watch } from 'vue';

    const props = defineProps<Partial<OrderListToolBarProps>>();

    const products = ["Samsung Galaxy S11", "iPhone 16", "Apple Watch"];

    //#region Filters

    const firstNameFilterEnabled = ref<boolean>(true);
    const addressFilterEnabled = ref<boolean>(true);
    const productFilterEnabled = ref<boolean>(true);
    const deliveryDateFilterEnabled = ref<boolean>(false);
    const deliveryTimeFilterEnabled = ref<boolean>(false);

    watch([firstNameFilterEnabled], () => {
        setFilterState({ column: 'firstName', type: "String", value: "" }, firstNameFilterEnabled.value)
    })
    
    watch([addressFilterEnabled], () => {
        setFilterState({ column: 'address', type: "String", value: "" }, addressFilterEnabled.value)
    })

    watch([productFilterEnabled], () => {
        setFilterState({ column: 'product', type: "String", value: "" }, productFilterEnabled.value)
    })

    watch([deliveryDateFilterEnabled], () => {
        const localDate = ref<string>('');
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        localDate.value = `${year}-${month}-${day}`;
        setFilterState({ column: 'deliveryDate', type: "Date", value: localDate.value }, deliveryDateFilterEnabled.value)
    })

    watch([deliveryTimeFilterEnabled], () => {
        const localTime = ref<string>('');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        localTime.value = `${hours}:${minutes}`;
        setFilterState({ column: 'deliveryTime', type: "Date", value: localTime.value }, deliveryTimeFilterEnabled.value)
    })

    //#endregion

    const getFilter = (name: string) => {
        const filter = findFilterByColumn(props.filters!, name)!
        return filter || "";
    }

    const setFilterState = (filter: Filter, enabled: boolean) => {
        if (enabled)
            props.filters?.push({ column: filter.column, type: filter.type, value: filter.value })
        else {
            const index = props.filters?.findIndex(f => f.column === filter.column);
            if (index !== -1) {
                props.filters?.splice(index!, 1);
            }
        }
    }
</script>

<template>
    <ToolBar>
        <ToolBarItem>
            <ToolBarInlineGroup>
                <BaseCheckbox v-model="firstNameFilterEnabled"></BaseCheckbox>
                <BaseInput 
                    small 
                    placeholder="First name"
                    v-model="getFilter('firstName')!.value"
                    :disabled="!firstNameFilterEnabled" />
            </ToolBarInlineGroup>    
        </ToolBarItem>
        <ToolBarItem>
            <ToolBarInlineGroup>
                <BaseCheckbox v-model="addressFilterEnabled"></BaseCheckbox>
                <BaseInput 
                    small 
                    placeholder="Address"
                    v-model="getFilter('address').value"
                    :disabled="!addressFilterEnabled" />
            </ToolBarInlineGroup>
        </ToolBarItem>
        <ToolBarItem>
            <ToolBarInlineGroup>
                <BaseCheckbox v-model="productFilterEnabled"></BaseCheckbox>
                <BaseCombobox 
                    small 
                    :values="products"
                    :allValues="true"
                    v-model="getFilter('product').value"
                    :disabled="!productFilterEnabled" />
            </ToolBarInlineGroup>
        </ToolBarItem>
        <ToolBarItem>
            <ToolBarInlineGroup>
                <BaseCheckbox v-model="deliveryDateFilterEnabled"></BaseCheckbox>
                <BaseDate 
                    small
                    v-model="getFilter('deliveryDate').value"
                    :disabled="!deliveryDateFilterEnabled" />
            </ToolBarInlineGroup>
        </ToolBarItem>
        <ToolBarItem>
            <ToolBarInlineGroup>
                <BaseCheckbox v-model="deliveryTimeFilterEnabled"></BaseCheckbox>
                <BaseTime 
                    small
                    v-model="getFilter('deliveryTime').value"
                    :disabled="!deliveryTimeFilterEnabled" />
            </ToolBarInlineGroup>
        </ToolBarItem>
        <ToolBarItem>
            <RouterLink to="/addorder">
                <BaseButton small text="Add order" />
            </RouterLink>
        </ToolBarItem>
    </ToolBar>
</template>