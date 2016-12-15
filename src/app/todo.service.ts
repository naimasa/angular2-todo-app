/**
 * Copyright (C) 2016 Masaki Naito
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * modified from:
 * Angular 2 Tutorial: Create a CRUD App with Angular CLI https://www.sitepoint.com/angular-2-tutorial/
 * sitepoint-editors/angular2-todo-app: Angular 2 Todo Application https://github.com/sitepoint-editors/angular2-todo-app
 * 
 * also see:
 * HTTP Client - ts - GUIDE https://angular.io/docs/ts/latest/guide/server-communication.html
 * 
 */

import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

  // Placeholder for last id
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  http: Http;

  constructor(http: Http) {
    // console.log("constructor called.");

    this.http = http;

    this.getAllTodos().subscribe(
      todos => this.lastId = todos[todos.length - 1].id
    )
  }

  private extractData(res: Response) {
    let body = res.json();
    // console.log(body);
    return body;
    // return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    return Promise.reject(errMsg);
  }

  // POST /todos
  addTodo(todo: Todo): Observable<Todo> {
    // console.log("addTodo called.");

    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:3000/api/todos", JSON.stringify(todo), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // DELETE /todos/:id
  deleteTodoById(id: number): Observable<Todo> {
    // console.log("deleteTodoById called.");

    return this.http.delete("http://localhost:3000/api/todos/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Observable<Todo> {
    // console.log("updateTodoById called.");

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put("http://localhost:3000/api/todos/" + id, values, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // GET /todos
  getAllTodos(): Observable<Todo[]> {
    // console.log("getAllTodos called.");

    return this.http.get("http://localhost:3000/api/todos")
      .map(this.extractData)
      .catch(this.handleError);
  }

  // GET /todos/:id
  getTodoById(id: number): Observable<Todo> {
    // console.log("getTodoById called.");

    return this.http.get("http://localhost:3000/api/todos/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo): Observable<Todo> {
    // console.log("toggleTodoComplete called.");

    return this.updateTodoById(todo.id, {
      complete: !todo.complete
    })
      .catch(this.handleError);
  }

}