<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    
    import './BaseDate.style.scss'

    import type { BaseDateProps } from './BaseDate.types';

    const props = defineProps<Partial<BaseDateProps>>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();


    const localDate = ref<string>('');

    onMounted(() => {
      if (!props.modelValue) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        localDate.value = `${year}-${month}-${day}`;
      } else {
        localDate.value = props.modelValue;
      }
    });

    watch(localDate, (newValue) => {
      emit('update:modelValue', newValue);
    });
</script>

<template>
    <label>{{ text }}</label>
    <input
        type="date"
        :class="small ? 'small-input' : 'large-input'"
        :disabled="disabled"
        v-model="localDate" />
</template>