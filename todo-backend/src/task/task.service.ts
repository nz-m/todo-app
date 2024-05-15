import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ createdBy: userId })
      .populate('createdBy', 'name')
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    return this.taskModel
      .findOne({ _id: id, createdBy: userId })
      .populate('createdBy', 'name')
      .exec();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    return this.taskModel
      .findOneAndUpdate(
        { _id: id, createdBy: userId },
        { isCompleted: updateTaskDto.isCompleted },
        {
          new: true,
        },
      )
      .exec();
  }

  async remove(id: string, userId: string): Promise<Task> {
    return this.taskModel
      .findOneAndDelete({ _id: id, createdBy: userId })
      .exec();
  }
}
