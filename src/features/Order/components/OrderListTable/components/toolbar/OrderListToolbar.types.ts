import type { Order } from "@/entities";
import type { Filter } from "@/shared/types/filter";
import type { TableResponse } from "@/shared/types/tableResponse";

export interface OrderListToolBarProps {
    filters: Filter[],
    onFilterChange?: (filters: Filter[]) => void;
}