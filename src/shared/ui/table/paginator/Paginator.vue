<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import "./Paginator.style.scss";
import type { PaginatorProps } from './Paginator.types';

const props = defineProps<PaginatorProps>();
const emit = defineEmits();

const pageNumbers = computed(() => {
    const pages = [];
    const totalPages = props.totalPages;

    const startPage = Math.max(1, props.currentPage - 1);
    const endPage = Math.min(totalPages, props.currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    if (startPage > 1) {
        pages.unshift('...');
    }
    if (endPage < totalPages) {
        pages.push('...');
    }

    if (!pages.includes(1)) {
        pages.unshift(1);
    }
    if (!pages.includes(totalPages)) {
        pages.push(totalPages);
    }

    return pages;
});

const goToPage = (page: number) => {
    if (page.toString() !== '...' && page !== props.currentPage) {
        props.onPageChange(page)
    }
};

const goToPreviousPage = () => {
    if (props.currentPage > 1) {
        emit("update:currentPage", props.currentPage - 1); // Используем emit для обновления страницы
        props.onPageChange(props.currentPage - 1)
    }
};

const goToNextPage = () => {
    if (props.currentPage < props.totalPages) {
        emit("update:currentPage", props.currentPage + 1); // Используем emit для обновления страницы
        props.onPageChange(props.currentPage + 1)
    }
};
</script>

<template>
    <div class="paginator">
        <button @click="goToPreviousPage" :disabled="props.currentPage === 1">
            <img src="/icons/arrow-left.svg" />
        </button>
        <div v-for="(page, index) in pageNumbers" :key="page">
            <button @click="goToPage(page)" :class="{ active: page === props.currentPage }">
                {{ page }}
            </button>
        </div>
        <button @click="goToNextPage" :disabled="props.currentPage === props.totalPages">
            <img src="/icons/arrow-right.svg" />
        </button>
    </div>
</template>
