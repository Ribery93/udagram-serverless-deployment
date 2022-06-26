import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { TodosRepo } from '../data/todos-repo'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todosAccess = new TodosRepo()


export async function getTodos(userID : string){
  return todosAccess.getTodos(userID)
}

export async function deleteIt(todoID: string, userID: string){
  return todosAccess.delete(userID, todoID)
}

export async function save( saveRequest: CreateTodoRequest, userID: string ): Promise<TodoItem> {
  const todoID = uuid.v4()
  return await todosAccess.save({
    todoId: todoID,
    userId: userID,
    name: saveRequest.name,
    createdAt : new Date().toISOString(),
    done: false,
    dueDate : saveRequest.dueDate,
  })
}

export async function put( todoID: string, putRequest: UpdateTodoRequest, userID: string ): Promise<void> {
  const { name, dueDate, done } = putRequest;
  await todosAccess.put(todoID, userID, name, dueDate, done);
}

export async function archive(todoID: string, userID: string){
  const imageID = uuid.v4()
  return todosAccess.archive(todoID,userID,imageID);
}