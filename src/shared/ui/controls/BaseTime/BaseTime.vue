<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    
    import './BaseTime.style.scss'

    import type { BaseTimeProps } from './BaseTime.types';

    const props = defineProps<Partial<BaseTimeProps>>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const localTime = ref<string>('');

    onMounted(() => {
        if (!props.modelValue) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            localTime.value = `${hours}:${minutes}`;
        } else {
            localTime.value = props.modelValue;
        }
    });

    watch(() => props.modelValue, (newValue) => {
        if (newValue) {
            localTime.value = newValue;
        }
    });

    watch(localTime, (newValue) => {
        emit('update:modelValue', newValue);
    });
</script>

<template>
    <label>{{ text }}</label>
    <input
        type="time" 
        :class="small ? 'small-input' : 'large-input'"
        :disabled="disabled"
        v-model="localTime" />
</template>