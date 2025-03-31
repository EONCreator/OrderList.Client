<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import './Loading.style.scss'
    import type { LoadingProps } from './Loading.types';

    const props = defineProps<LoadingProps>();
</script>

<template>
    <div class="loading-background" v-if="props.loading">
        <div class="loading-content">
            <div class="loading">
                <div v-for="i in 8"></div>
            </div>
            <div class="loading-title">{{ props.title }}</div>
        </div>
    </div>
</template>