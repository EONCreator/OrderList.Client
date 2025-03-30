<script lang="ts" setup>
    import './BaseCheckbox.style.scss'
    
    import type { BaseCheckboxProps } from './BaseCheckbox.types';

    const props = withDefaults(defineProps<Partial<BaseCheckboxProps>>(), {
        disabled: false,
        text: "Checkbox",
        modelValue: false
    });

    const emit = defineEmits<{
        (event: 'update:modelValue', value: boolean): void;
    }>();

    const handleChange = () => {
        emit('update:modelValue', !props.modelValue);
    };
</script>

<template>
    <input
        type="checkbox"
        :disabled="disabled"
        @change="handleChange"
         />
    <label>{{ text }}</label>
</template>