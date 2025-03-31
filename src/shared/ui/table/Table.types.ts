import type { Filter } from "@/shared/types/filter";
import type { SortDefinition } from "@/shared/types/sortDefinition";
import type { TableResponse } from "@/shared/types/tableResponse";

export interface TableColumn {
    name: string;
    key: string;
    sortable?: boolean;
}

export interface TableProps<T = any> {
    columns: TableColumn[];
    
    filters: Filter[],
    sortDefinition: SortDefinition;

    dataLoader: (pageNumber: number) => Promise<TableResponse<T>>;

    currentPage: number,
    pageSize: number
}