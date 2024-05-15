export class CreateTaskDto {
  readonly title: string;
  readonly description?: string;
  readonly priority?: string;
  readonly dueDate?: Date;
  readonly category?: string;
  createdBy: string;
}
