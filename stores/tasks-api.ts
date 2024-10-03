import type { ITask } from '~/types/types';

const baseUrl = 'http://127.0.0.1:3000';

async function getTasksListApi(): Promise<Ref<Array<ITask>>> {
    const response = await useFetch(() => `${baseUrl}/tasks`);

    if (!response || response.data == undefined || response.data == null)
        throw 'Encountered error while fetching data';

    return response.data as unknown as Ref<Array<ITask>>;
}

async function deleteTaskApi(taskId: number): Promise<Ref<boolean>> {
    if (taskId === null || taskId === undefined) throw 'Invalid task id';

    const response = await useFetch(() => `${baseUrl}/tasks/${taskId}`, {
        method: 'delete',
    });
    if (!response || response.data == undefined || response.data == null)
        throw 'Encountered error while fetching data';

    return response.data as unknown as Ref<boolean>;
}

async function editTaskApi(task: ITask): Promise<Ref<boolean>> {
    console.log('test3');
    if (!task || Object.keys(task).length === 0) throw 'Invalid task object';

    const response = await useFetch(() => `${baseUrl}/tasks`, {
        method: 'put',
        body: task,
    });
    if (!response || response.data == undefined || response.data == null)
        throw 'Encountered error while fetching data';

    return response.data as unknown as Ref<boolean>;
}

async function addTaskApi(task: ITask): Promise<Ref<ITask>> {
    console.log('test2');
    if (!task || Object.keys(task).length === 0) throw 'Invalid task object';

    const response = await useFetch(() => `${baseUrl}/tasks`, {
        method: 'post',
        body: task,
    });
    if (!response || response.data == undefined || response.data == null)
        throw 'Encountered error while fetching data';

    return response.data as unknown as Ref<ITask>;
}

export { getTasksListApi, deleteTaskApi, editTaskApi, addTaskApi };
