<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    import './BaseCombobox.style.scss'
    
    import type { BaseComboboxProps } from './BaseCombobox.types';

    const props = defineProps<Partial<BaseComboboxProps>>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const localValue = ref<string>('');

    onMounted(() => {
        if (props.allValues) {
            localValue.value = '';
        } else if (props.modelValue) {
            localValue.value = props.modelValue;
        } else if (props.values && props.values.length > 0) {
            localValue.value = props.values[0];
        }
    });

    watch(() => props.modelValue, (newValue) => {
        if (newValue) {
            localValue.value = newValue;
        }
    });

    watch(localValue, (newValue) => {
        emit('update:modelValue', newValue);
    });

    if (props.modelValue) {
        localValue.value = props.modelValue;
    }
</script>

<template>
    <label>{{ text }}</label>
    <div class="combobox">
        <select
            :class="small ? 'small-input' : 'large-input'"
            :disabled="disabled"
            v-model="localValue">
            <option v-if="allValues" :value="''">All</option>
            <option v-for="value in values" :key="value" :value="value">{{ value }}</option>
        </select>
    </div>
</template>