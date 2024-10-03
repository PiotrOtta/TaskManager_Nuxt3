<template>
    <el-dialog
        v-model="isVisible"
        style="
            background-color: color-mix(
                in srgb,
                var(--el-dialog-bg-color) 90%,
                transparent
            );
        "
        :title="editTask ? 'Adding new task' : 'Editing existing task'"
        width="500"
        align-center
        draggable>
        <el-form ref="formRef" :model="task">
            <el-form-item
                label="Title"
                prop="title"
                required
                label-position="top"
                :rules="{
                    required: true,
                    message: 'Title cannot be null',
                    trigger: 'blur',
                }">
                <el-input v-model="task.title" autocomplete="off" />
            </el-form-item>
            <el-form-item
                label="Description"
                prop="description"
                required
                label-position="top"
                :rules="{
                    required: true,
                    message: 'Description cannot be null',
                    trigger: 'blur',
                }">
                <el-input v-model="task.description" type="textarea" />
            </el-form-item>
            <div class="flex flex-row justify-between items-center">
                <el-form-item
                    label="Priority"
                    prop="priority"
                    label-position="top">
                    <el-segmented
                        v-model="task.priority"
                        :class="task.priority"
                        :options="Object.values(EProrities).reverse()" />
                </el-form-item>
                <el-form-item label="Status" prop="status" label-position="top">
                    <el-segmented
                        v-model="task.status"
                        :class="task.status"
                        :options="Object.values(EStatuses)" />
                </el-form-item>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="info" @click="isVisible = false">
                    Cancel
                </el-button>
                <el-button
                    type="success"
                    :loading="saveButtonBusy"
                    @click="handleSave(formRef)">
                    Save
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import type { ITask } from '~/types/types';
import { EProrities, EStatuses } from '~/types/enums';

const formRef = ref();
const saveButtonBusy = ref<boolean>(false);
const taskStore = useTasksStore();
const { editTask } = storeToRefs(taskStore);

const isVisible = computed({
    get() {
        if (editTask?.value) Object.assign(task, editTask?.value);
        return taskStore.getTaskDialogOpen;
    },
    set(value: boolean) {
        taskStore.setTaskDialogVisibility(value);
        Object.assign(task, initialTaskState);
    },
});

const initialTaskState = {
    id: 0,
    title: '',
    description: '',
    priority: EProrities.LOW,
    status: EStatuses.TODO,
    creationDate: new Date(),
};
const task = reactive<ITask>({ ...(editTask?.value || initialTaskState) });

function handleSave(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                saveButtonBusy.value = true;
                if (editTask?.value) {
                    await taskStore.editTaskStore({ ...task });
                } else {
                    console.log('test');
                    await taskStore.addTaskStore({ ...task });
                }
                isVisible.value = false;
            } catch (error) {
                console.error(error);
            } finally {
                saveButtonBusy.value = false;
            }
        } else {
            console.log('error submit!');
        }
    });
}
</script>

<style lang="css">
.el-segmented.LOW .el-segmented__item-selected {
    background: #409eff !important;
}
.el-segmented.MEDIUM .el-segmented__item-selected {
    background: #d1ab16 !important;
}
.el-segmented.HIGH .el-segmented__item-selected {
    background: #da2626 !important;
}

.el-segmented.TODO .el-segmented__item-selected {
    background: #777777 !important;
}
.el-segmented.INPROGRESS .el-segmented__item-selected {
    background: #409eff !important;
}
.el-segmented.COMPLETED .el-segmented__item-selected {
    background: #17af17 !important;
}
</style>
