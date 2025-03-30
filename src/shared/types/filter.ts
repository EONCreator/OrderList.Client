export interface Filter {
    column: string;
    type: string;
    value: string;
}

export function findFilterByColumn(filters: Filter[], columnName: string): Filter | undefined {
    return filters.find(filter => filter.column === columnName);
}