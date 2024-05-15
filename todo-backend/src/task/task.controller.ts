import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schema/task.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ): Promise<Task> {
    createTaskDto.createdBy = req.user.userId;
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    return this.taskService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Task> {
    return this.taskService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<Task> {
    return this.taskService.remove(id, req.user.userId);
  }
}
