export enum SortDirection {
    Ascending = 'Ascending',
    Descending = 'Descending',
}

export interface SortDefinition {
    column: string;
    type: SortDirection;
}