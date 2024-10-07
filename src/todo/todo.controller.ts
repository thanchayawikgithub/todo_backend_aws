import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }
  @Get(':id')
  getTodo(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodo(id);
  }
  @Post()
  addTodo(@Body() todo: Todo): Promise<Todo> {
    console.log(todo);
    return this.todoService.addTodo(todo);
  }

  @Patch(':id/toggle')
  toggleTodoStatus(@Param('id') id: number): Promise<Todo> {
    return this.todoService.toggleTodoStatus(id);
  }

  @Patch(':id')
  editTodo(
    @Param('id') id: number,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoService.editTodo(id, todo);
  }

  @Delete(':id')
  removeTodoAt(@Param('id') id: number): Promise<void> {
    return this.todoService.removeTodoAt(id);
  }
}
