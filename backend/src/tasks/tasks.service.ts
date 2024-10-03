import { Injectable } from '@nestjs/common';
import {
  EProrities,
  EStatuses,
  IIncomingTask,
  ITask,
} from 'src/interfaces/interfaces';

let cachedTasks: Array<ITask> = [
  {
    id: 0,
    title: 'Task 1',
    description: 'Lorem ipsum',
    priority: EProrities.LOW,
    status: EStatuses.TODO,
    creationDate: new Date(),
  },
  {
    id: 1,
    title: 'Task 2',
    description: 'Lorem ipsumLorem ipsum \nLorem ipsum',
    priority: EProrities.MEDIUM,
    status: EStatuses.INPROGRESS,
    creationDate: new Date(),
  },
  {
    id: 2,
    title: 'Task 3',
    description: 'Lorem ipsumLorem ipsum',
    priority: EProrities.HIGH,
    status: EStatuses.COMPLETED,
    creationDate: new Date(),
  },
  {
    id: 3,
    title: 'Task 4 - important',
    description:
      'This task is todo and in high priority therefor border is set to red.',
    priority: EProrities.HIGH,
    status: EStatuses.TODO,
    creationDate: new Date(),
  },
  {
    id: 4,
    title: 'Task 5',
    description:
      'Lorem ipsumLorem ipsum \nLorem ipsum Lorem ipsumLorem ipsum \nLorem ipsum Lorem ipsumLorem ipsum \nLorem ipsum',
    priority: EProrities.LOW,
    status: EStatuses.TODO,
    creationDate: new Date(),
  },
];
let _id = cachedTasks[cachedTasks.length - 1].id++;

@Injectable()
export class TasksService {
  getTask(): Array<ITask> | null {
    return cachedTasks;
  }
  addTask(newTask: IIncomingTask): ITask {
    const _task = {
      id: _id++,
      title: newTask.title,
      description: newTask.description,
      priority:
        EProrities?.[`${newTask?.priority?.toLocaleUpperCase?.()}`] ||
        EProrities.LOW,
      status:
        EStatuses?.[`${newTask?.status?.toLocaleUpperCase?.()}`] ||
        EStatuses.TODO,
      creationDate: new Date(),
    };
    cachedTasks.push(_task);
    return _task;
  }
  updateTask(updateTask: IIncomingTask): boolean | null {
    const foundItem = cachedTasks.find(
      (task) => Number(task.id) === Number(updateTask.id),
    );
    if (!foundItem) return false;

    foundItem.title = updateTask.title;
    foundItem.description = updateTask.description;
    foundItem.priority =
      EProrities?.[`${updateTask?.priority?.toLocaleUpperCase?.()}`] ||
      EProrities.LOW;
    foundItem.status =
      EStatuses?.[`${updateTask?.status?.toLocaleUpperCase?.()}`] ||
      EStatuses.TODO;
    return true;
  }
  deleteTask(deleteId: number): boolean | null {
    const foundIndex = cachedTasks.findIndex(
      (task) => Number(task.id) === Number(deleteId),
    );

    if (foundIndex < 0) return false;
    cachedTasks.splice(foundIndex, 1);
    return true;
  }
}
