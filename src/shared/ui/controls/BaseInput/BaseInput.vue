<script lang="ts" setup>
    import './BaseInput.style.scss'

    import type { BaseInputProps } from './BaseInput.types';

    withDefaults(defineProps<Partial<BaseInputProps>>(), {
        disabled: false,
        text: "",
        placeholder: 'Search Items',
    })

    const inputValue = defineModel()
</script>

<template>
    <label>{{ text }} <span v-if="required" class="required">*</span></label>
    <input
        type="text" 
        :class="small ? 'small-input' : 'large-input'"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="inputValue" />
    <label class="error">{{ error }}</label>
</template>