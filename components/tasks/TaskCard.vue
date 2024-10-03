<template>
    <client-only>
        <el-card
            v-if="task"
            class="w-full relative"
            style="
                background-color: color-mix(
                    in srgb,
                    var(--el-card-bg-color) 60%,
                    transparent
                );
            "
            :style="
                priorityValue === 3 && task.status !== EStatuses.COMPLETED
                    ? `border-color: #dd0000`
                    : null
            "
            :class="{ isHovered: isHovered }"
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false">
            <template #header>
                <span class="idLabel">#{{ task.id }}</span>
                <div class="card-header flex flex-col">
                    <div class="flex items-center">
                        <span class="text-lg">{{ task.title }}</span>
                        <el-tag
                            class="ml-4"
                            effect="plain"
                            :type="handleStatusColor(task.status)">
                            {{ task.status }}
                        </el-tag>
                    </div>
                    <div
                        class="flex flex-row items-center justify-between mt-2">
                        <el-rate
                            v-model="priorityValue"
                            disabled
                            size="large"
                            allow-half
                            :low-threshold="1"
                            :high-threshold="2.3"
                            :max="3"
                            show-score
                            :colors="['#409eff', '#ffd52b', '#ff3c3c']"
                            :score-template="
                                prioritiesToString(priorityValue)
                            " />
                        <span>{{
                            new Date(task.creationDate).toLocaleString()
                        }}</span>
                    </div>
                </div>
            </template>

            <p
                class="text item"
                style="white-space: break-spaces"
                v-html="task.description" />

            <template #footer>
                <div class="flex justify-center dynamicFooter">
                    <el-button
                        type="primary"
                        icon="SvgoEdit"
                        @click="handleEdit(task)" />
                    <el-button
                        type="danger"
                        :loading="isDeleting"
                        icon="SvgoDelete"
                        @click="handleDelete(task.id)" />
                </div>
            </template>
        </el-card>

        <el-card v-else>
            <template #header>
                <div class="card-header">
                    <span>Incorrect task encountered</span>
                </div>
            </template>
        </el-card>
    </client-only>
</template>

<script setup lang="ts">
import { EProrities, EStatuses } from '~/types/enums';
import type { ITask } from '~/types/types';

// @ts-ignore
const { task } = defineProps({
    task: {
        type: Object as () => ITask,
    },
});
const isHovered = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const taskStore = useTasksStore();

const priorityValue = computed(() => {
    switch (task?.priority) {
        case EProrities.LOW:
        default:
            return 1;
        case EProrities.MEDIUM:
            return 2;
        case EProrities.HIGH:
            return 3;
    }
});

function prioritiesToString(value: number) {
    switch (value) {
        case 1:
        default:
            return 'Low priority';
        case 2:
            return 'Medium priority';
        case 3:
            return 'High priority';
    }
}

function handleStatusColor(status: EStatuses | undefined) {
    switch (status) {
        case EStatuses.TODO:
        default:
            return 'info';
        case EStatuses.INPROGRESS:
            return 'primary';
        case EStatuses.COMPLETED:
            return 'success';
    }
}

async function handleDelete(taskId: number) {
    try {
        isDeleting.value = true;
        await taskStore.deleteTaskStore(taskId);
    } catch (error) {
        console.error(error);
    } finally {
        isDeleting.value = false;
    }
}

function handleEdit(task: ITask) {
    taskStore.setEditTask(task);
    taskStore.setTaskDialogVisibility();
}
</script>
