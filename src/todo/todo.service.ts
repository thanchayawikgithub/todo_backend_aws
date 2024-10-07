import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    return await this.todoRepository.save(newTodo);
  }

  async removeTodoAt(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async toggleTodoStatus(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (todo) {
      todo.isDone = !todo.isDone;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  async editTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOneBy({ id: id });
  }

  async getTodo(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id: id });
  }

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
