interface ITask {
  id: number;
  title: string;
  description: string;
  priority?: EProrities;
  status?: EStatuses;
  creationDate: Date;
}

interface IIncomingTask extends Omit<ITask, 'priority' | 'status'> {
  priority?: string;
  status?: string;
}

enum EProrities {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

enum EStatuses {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}

export { ITask, IIncomingTask, EProrities, EStatuses };
