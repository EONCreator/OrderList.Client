<script lang="ts" setup>
    import './Form.style.scss'

    import type { FormProps } from './Form.types';

    withDefaults(defineProps<FormProps>(), {
        title: "Form"
    })
</script>

<template>
    <div class="form">
        <div class="header">
            <div class="title">{{ title }}</div>
        </div>
        <slot></slot>
    </div>
</template>