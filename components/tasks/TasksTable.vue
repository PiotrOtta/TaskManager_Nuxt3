<template>
    <TransitionGroup
        name="taskList"
        tag="div"
        class="w-full flex flex-wrap items-center w-full"
        :class="
            isSortingActive && sortingDirection === 'UP'
                ? 'flex-col-reverse'
                : 'flex-col'
        ">
        <div v-for="task in tasksList" :key="task.id" class="mb-4 w-full">
            <TaskCard :task="task" />
        </div>
    </TransitionGroup>
</template>

<script setup lang="ts">
import type { EProrities } from '~/types/enums';

const tasksStore = useTasksStore();
const {
    isSortingActive,
    sortingDirection,
    sortingBy,
    isFilteringActive,
    filterBy,
} = storeToRefs(useToolsStore());

const tasksList = computed(() => {
    let _tasks = [...tasksStore.getTasks];

    function priorityToNumber(priority?: EProrities) {
        switch (priority) {
            case 'HIGH':
                return 3;
            case 'MEDIUM':
                return 2;
            default:
            case 'LOW':
                return 1;
        }
    }
    function getTime(date: Date) {
        return new Date(date).getTime();
    }
    
    // filtering
    if (isFilteringActive.value && filterBy.value?.length) {
        _tasks = _tasks.filter(
            (task) =>
                // eslint-disable-next-line @stylistic/operator-linebreak
                (task.status && filterBy.value.includes(task.status)) ||
                (task.priority && filterBy.value.includes(task.priority)),
        );
    }

    // sorting
    if (isSortingActive.value) {
        if (sortingBy.value === 'CREATION_DATE') {
            _tasks = _tasks.sort(
                (a, b) => getTime(a.creationDate) - getTime(b.creationDate),
            );
        } else {
            _tasks = _tasks.sort(
                (a, b) =>
                    priorityToNumber(a.priority) - priorityToNumber(b.priority),
            );
        }
    }


    return _tasks;
});
</script>

<style>
.taskList-enter-active,
.taskList-leave-active {
    transition: all 0.5s ease;
}
.taskList-enter-from,
.taskList-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
