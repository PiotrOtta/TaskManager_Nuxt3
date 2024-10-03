<template>
    <div class="flex justify-center mb-2">
        <div class="flex justify-between w-full">
            <el-tooltip
                :hide-after="50"
                content="Add new task"
                placement="top"
                effect="light">
                <el-button
                    class="w-1/4"
                    type="success"
                    icon="SvgoPlus"
                    @click="handleNewTaskBtn" />
            </el-tooltip>

            <el-tooltip
                :hide-after="50"
                content="Refresh tasks from api. Backend has 2 second static timeout."
                placement="top"
                effect="light">
                <el-button
                    :loading="btnsStates.isBtnLoading"
                    class="w-1/4"
                    type="primary"
                    icon="SvgoRefresh"
                    @click="handleRefreshBtn" />
            </el-tooltip>

            <el-tooltip
                :hide-after="50"
                content="Sort by creation date or priority."
                placement="top"
                effect="light">
                <el-button
                    class="w-1/4"
                    :type="isSortingActive ? 'primary' : 'info'"
                    icon="SvgoSort"
                    @click="handleShowSorting" />
            </el-tooltip>

            <el-tooltip
                :hide-after="50"
                content="Filter by status and priority"
                placement="top"
                effect="light">
                <el-button
                    class="w-1/4"
                    :type="isFilteringActive ? 'primary' : 'info'"
                    icon="SvgoFilter"
                    @click="handleShowFiltering" />
            </el-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks';

const tasksStore = useTasksStore();
const toolsStore = useToolsStore();
const { isFilteringActive, isSortingActive } = storeToRefs(toolsStore);

const btnsStates = reactive({
    isBtnLoading: false,
});

function handleNewTaskBtn() {
    tasksStore.clearEditTask();
    tasksStore.setTaskDialogVisibility(true);
}

async function handleRefreshBtn() {
    try {
        btnsStates.isBtnLoading = true;
        await tasksStore.fetchTasksList();
        ElNotification({
            message: 'Fetched tasks successfully',
            type: 'success',
        });
    } catch (error) {
        console.error(error);
    } finally {
        btnsStates.isBtnLoading = false;
    }
}

function handleShowSorting() {
    toolsStore.setSortingState(!isSortingActive.value);
}
function handleShowFiltering() {
    toolsStore.setFilteringState(!isFilteringActive.value);
}

onMounted(async () => {
    await nextTick();
    handleRefreshBtn();
});
</script>
