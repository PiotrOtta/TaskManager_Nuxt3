import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { IIncomingTask, ITask } from 'src/interfaces/interfaces';
import { isEmptyExcludingZero } from 'src/helpers/helpers';
import { setTimeout } from 'timers/promises';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getTasks(): Promise<ITask[]> {
    await setTimeout(1000);
    return this.tasksService.getTask();
  }

  @Post('/')
  addTask(@Req() req: RawBodyRequest<Request>): ITask {
    if (!req?.rawBody)
      throw new HttpException('No task was provided', HttpStatus.BAD_REQUEST);

    const data = req?.rawBody?.toString?.();
    if (!data)
      throw new HttpException('Invalid data sent', HttpStatus.BAD_REQUEST);

    const parsedJSONTask: IIncomingTask = JSON.parse(data);
    if (!parsedJSONTask || !parsedJSONTask.title || !parsedJSONTask.description)
      throw new HttpException(
        'Required values in tasks are not provided',
        HttpStatus.BAD_REQUEST,
      );

    return this.tasksService.addTask(parsedJSONTask);
  }

  @Put('/')
  updateTask(@Req() req: RawBodyRequest<Request>): boolean | null {
    if (!req?.rawBody)
      throw new HttpException('No task was provided', HttpStatus.BAD_REQUEST);

    const data = req?.rawBody?.toString?.();
    if (!data)
      throw new HttpException('Invalid data sent', HttpStatus.BAD_REQUEST);

    const parsedJSONTask: IIncomingTask = JSON.parse(data);
    if (!parsedJSONTask || !parsedJSONTask.title || !parsedJSONTask.description)
      throw new HttpException(
        'Required values in tasks are not provided',
        HttpStatus.BAD_REQUEST,
      );

    if (isEmptyExcludingZero(parsedJSONTask?.id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    return this.tasksService.updateTask(parsedJSONTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<boolean> {
    if (isEmptyExcludingZero(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    await setTimeout(1000);
    return this.tasksService.deleteTask(id);
  }
}
