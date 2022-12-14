import { Injectable } from '@angular/core';
import {BehaviorSubject, find, map, Observable, of, Subject} from "rxjs";
import {ITodo} from "../interfaces/todo.interface";
import {StorageService} from "./storage.service";
import {PersonService} from "./person.service";
import {IPerson} from "../interfaces/person.interface.ts";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([])

  // get todos(): ITodo[] {
  //   return this.storageService.get('todos') || [];
  // }



  getTodos(): Observable<ITodo[]> {

return  this.todos$.asObservable();
  }
 getTodoById(id: string | number): Observable<ITodo | undefined> {
    return this.todos$.pipe(
      map((todos) => {
        return todos.find(todo => todo.id === id)
      })
    )
}
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

addTodo(todo: ITodo): Observable<ITodo> {
    const todos = this.todos$.getValue();
    todo.id = this.generateId();
    todo.createdAt = new Date();
    todo.status = 'pending';
    // todos.push(todo);
    // this.storageService.set('todos', todos);
    this.todos$.next([...this.todos$.getValue(), todo])
    return of(todo)
}

updateTodoById(id: string | number, todo: ITodo): Observable<ITodo> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = {
      ...todos[index],
      ...todo
    };
  // this.storageService.set('todos', todos)
  this.todos$.next(todos)
  return of(todo)
}

deleteTodoById(id: string | number): Observable<boolean> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
  this.todos$.next(todos)
    return of(true)

}

completeTodoById(id:string | number): Observable<ITodo> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = {
      ...todos[index],
      status: 'completed'
    };
    // this.storageService.set('todos', todos);
  this.todos$.next(todos)
    return of(todos[index])
}

}
