import { defineStore } from 'pinia';
import {
    getTasksListApi,
    deleteTaskApi,
    editTaskApi,
    addTaskApi,
} from './tasks-api';
import type { ITaskState } from '~/types/stores';
import type { ITask } from '~/types/types';

export const useTasksStore = defineStore('tasks', {
    state: (): ITaskState => ({
        tasksList: [],
        editTask: undefined,
        taskDialogOpen: false,
    }),
    getters: {
        getTasks: (state) => state.tasksList,
        getTaskDialogOpen: (state) => state.taskDialogOpen,
    },
    actions: {
        async fetchTasksList(): Promise<void> {
            const fetchedTasks = (await getTasksListApi())?.value;

            this.clearTaskList();
            if (fetchedTasks.length) return this.setTaskList(fetchedTasks);
        },
        async deleteTaskStore(taskId: number): Promise<void> {
            const isRemoved = (await deleteTaskApi(taskId))?.value;

            if (isRemoved) {
                const foundIndex = this.tasksList.findIndex(
                    (task) => Number(task.id) === Number(taskId),
                );

                if (foundIndex < 0) return;
                this.tasksList.splice(foundIndex, 1);
            } else throw 'Task was not removed';
        },
        async editTaskStore(task: ITask): Promise<void> {
            const editedTask = (await editTaskApi(task))?.value;
            console.log('editTaskStore ~ editedTask:', editedTask);

            if (!editedTask) return;

            const foundElement = this.tasksList.findIndex(
                (t) => t.id === task.id,
            );
            if (foundElement < 0) return;
            console.log('editTaskStore ~ task:', task);
            console.log(
                'editTaskStore ~ this.tasksList[foundElement]:',
                this.tasksList[foundElement],
            );
            this.tasksList[foundElement] = task;
        },
        async addTaskStore(task: ITask): Promise<void> {
            const addedTask = (await addTaskApi(task))?.value;

            if (!addedTask) return;
            this.tasksList.push(addedTask);
        },
        setTaskList(newTaskList: Array<ITask>): void {
            this.$state.tasksList = newTaskList;
        },
        clearTaskList(): void {
            this.$state.tasksList = [];
        },
        setEditTask(editedTask: ITask): void {
            this.$state.editTask = editedTask;
        },
        clearEditTask(): void {
            this.$state.editTask = undefined;
        },
        setTaskDialogVisibility(flag: boolean = true): void {
            if (!flag) this.clearEditTask();
            this.$state.taskDialogOpen = flag;
        },
    },
});
