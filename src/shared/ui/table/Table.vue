<script setup lang="ts">
	import "./Table.style.scss"
    import { onMounted, ref, watch } from "vue";
	import type { TableProps } from "./Table.types";
	import { SortDirection } from "@/shared/types/sortDefinition";
	import Paginator from "./paginator/Paginator.vue";
	import type { TableResponse } from "@/shared/types/tableResponse";

	const emit = defineEmits();
	const props = defineProps<TableProps<unknown>>();
	const currentPage = ref<number>(1);

	//#region Data loading

	const tableResponse = ref<TableResponse<unknown>>({ items: [], totalPages: 1});
	const loadData = async (page: number) => {
		try {
			const response = await props.dataLoader(page);
			tableResponse.value = { items: response.items, totalPages: response.totalPages }
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};

	//#endregion

	//#region Filters
	
	watch([props.filters], () => {
		setTimeout(() => {
			currentPage.value = 1
			loadData(currentPage.value)
		}, 100)
	})

	//#endregion

	//#region Sorting

	const sortByColumn = (column: string) => {
		if (props.sortDefinition.column === column) {
			props.sortDefinition.type = 
				props.sortDefinition.type === SortDirection.Ascending 
					? SortDirection.Descending 
					: SortDirection.Ascending;
		} else {
			props.sortDefinition.column = column
			props.sortDefinition.type = SortDirection.Ascending
    	}

		loadData(currentPage.value)
	};

	//#endregion

	//#region Paging

	const changePage = (newPage: number) => {
		if (newPage > 0 && newPage <= tableResponse.value.totalPages) {
			currentPage.value = newPage
			loadData(currentPage.value)
    	}
	};

	//#endregion

	onMounted(() => loadData(currentPage.value))
</script>

<template>
    <div class="table">
        <div class="data">
            <table class="data-grid">
				<thead>
					<tr>
						<th v-for="column in columns" :key="column.key" @click="column.sortable ? sortByColumn(column.key) : null">
							<div class="column">
								<div class="name">{{ column.name }}</div>
								<div class="sort-indicator" v-if="column.sortable">
									<span v-if="props.sortDefinition.column === column.key">
										<span v-if="props.sortDefinition.type === SortDirection.Ascending">↑</span>
										<span v-else>↓</span>
									</span>
								</div>
							</div>
                		</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in tableResponse.items">
						<td v-for="el in item">
							<div class="success" v-if="el == true">&#x1F5F9;</div>
							<div class="error" v-else-if="el == false">&#128473;</div>
							<div v-else>{{ el }}</div>
						</td>
					</tr>
				</tbody>
			</table>
        </div>
		<div class="table-footer">
			<Paginator 
            	:currentPage="currentPage" 
            	:totalPages="tableResponse.totalPages" 
            	:onPageChange="changePage" 
        	/>
		</div>
    </div>
</template>