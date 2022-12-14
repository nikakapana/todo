import {TodoStatus} from "../types/todo.status";
import {IPerson} from "./person.interface.ts";

export interface ITodo {
  id: string
  title: string
  description: string
  status: TodoStatus
  dueDate: Date
  createdAt: Date
  updatedAt?: Date
  removeAt?: Date
  responsiblePerson: IPerson
  responsiblePersonId: string
}
