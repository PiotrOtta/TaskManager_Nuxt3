import { defineStore } from 'pinia';
import type {
    IToolsState,
    TSortingBy,
    TSortingDirection,
} from '~/types/stores';

export const useToolsStore = defineStore('tools', {
    state: (): IToolsState => ({
        isFilteringActive: false,
        isSortingActive: false,
        filterBy: [],
        sortingBy: 'CREATION_DATE',
        sortingDirection: 'DOWN',
    }),
    getters: {
        getFilteringActive: (state) => state.isFilteringActive,
        getSortingActive: (state) => state.isSortingActive,
    },
    actions: {
        setFilteringState(newState: boolean): void {
            this.isFilteringActive = newState;
        },
        setSortingState(newState: boolean): void {
            this.isSortingActive = newState;
        },
        setFilterBy(newState: Array<string>): void {
            this.filterBy = newState;
        },
        setSortingBy(newState: TSortingBy): void {
            if (newState !== this.sortingBy) {
                this.sortingBy = newState;
                return;
            }
            this.setSortingDirection(
                this.sortingDirection === 'DOWN' ? 'UP' : 'DOWN',
            );
        },
        setSortingDirection(newState: TSortingDirection): void {
            this.sortingDirection = newState;
        },
    },
});
