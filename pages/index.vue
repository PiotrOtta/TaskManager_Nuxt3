<template>
    <div class="flex justify-center">
        <div style="max-width: 1080px; min-width: 480px">
            <EditAndAddDialog />
            <el-container class="mt-2">
                <HeaderBar />
                <ToolsBar class="mt-4" />
                <SortingBar />
                <FilteringBar />
            </el-container>
            <el-container class="my-3">
                <TasksTable />
            </el-container>
        </div>
    </div>
</template>

<style>
:root {
    --el-switch-off-color: #3d4045 !important;
    --el-border-color: #3d4045 !important;
}
</style>
