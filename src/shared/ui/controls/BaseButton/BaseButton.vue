<script lang="ts" setup>
    import './BaseButton.style.scss'
    
    import type { BaseButtonProps } from './BaseButton.types';

    withDefaults(defineProps<Partial<BaseButtonProps>>(), {
        disabled: false,
        text: "Button",
    })
</script>

<template>
    <input type="button"
        :disabled="disabled"
        :class="small ? 'small-input' : 'large-input'"
        :value="text" />
</template>