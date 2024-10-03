import type { ITask } from './types';

type TSortingDirection = 'UP' | 'DOWN';
type TSortingBy = 'CREATION_DATE' | 'PRIORITY';

interface IToolsState {
    isFilteringActive: boolean;
    filterBy: Array<string>;

    isSortingActive: boolean;
    sortingDirection: TSortingDirection;
    sortingBy: TSortingBy;
}

interface ITaskState {
    tasksList: Array<ITask>;
    editTask?: ITask;
    taskDialogOpen: boolean;
}

export type { IToolsState, ITaskState, TSortingBy, TSortingDirection };
