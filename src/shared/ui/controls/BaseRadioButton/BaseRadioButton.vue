<script lang="ts" setup>
    import './BaseRadioButton.style.scss'
    
    import type { BaseRadioButtonProps } from './BaseRadioButton.types';

    const props = withDefaults(defineProps<Partial<BaseRadioButtonProps>>(), {
        disabled: false,
        text: "Button",
        name: "radio-group"
    });

    const emit = defineEmits<{
        (event: 'update:modelValue', value: string): void;
    }>();

    const handleChange = () => {
        emit('update:modelValue', props.text);
    };
</script>

<template>
    <input type="radio"
            :disabled="disabled"
            :value="text"
            :name="name"
            :checked="modelValue === text"
            @change="handleChange" />
    <label>{{ text }}</label>
</template>