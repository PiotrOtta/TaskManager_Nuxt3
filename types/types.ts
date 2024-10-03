import type { EProrities, EStatuses } from './enums';

interface ITask {
    id: number;
    title: string;
    description: string;
    priority?: EProrities;
    status?: EStatuses;
    creationDate: Date;
}

export type { ITask };
