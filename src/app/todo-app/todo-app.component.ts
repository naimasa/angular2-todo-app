/**
 * Copyright (C) 2016 Masaki Naito
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * modified from:
 * Angular 2 Tutorial: Create a CRUD App with Angular CLI https://www.sitepoint.com/angular-2-tutorial/
 * sitepoint-editors/angular2-todo-app: Angular 2 Todo Application https://github.com/sitepoint-editors/angular2-todo-app
 */

import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
    selector: 'todo-app',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.css'],
    providers: [TodoService]
})
export class TodoAppComponent {

    newTodo: Todo = new Todo();
    todos: Todo[] = [];
    errorMessage: string;

    constructor(private todoService: TodoService) {
        this.getTodos();
    }

    addTodo() {
        this.todoService.addTodo(this.newTodo)
            .subscribe(
            todo => {
                this.todos.push(todo);
                this.newTodo = new Todo();
            },
            error => this.errorMessage = <any>error);
    }

    toggleTodoComplete(todo) {
        this.todoService.toggleTodoComplete(todo)
            .subscribe(
            todo => {
                this.todos.forEach((value, index, array) => {
                    if (value.id == todo.id) {
                        // todo has been updated
                        value.complete = todo.complete;
                    }
                });
            },
            error => this.errorMessage = <any>error)
    }

    removeTodo(todo) {
        this.todoService.deleteTodoById(todo.id)
            .subscribe(
            todo => {
                // console.log("delete success." + todo.id);
                this.todos = this.todos.filter(i => i.id != todo.id);
            },
            error => this.errorMessage = <any>error);
    }

    getTodos() {
        this.todoService.getAllTodos()
            .subscribe(
            todos => {
                // console.log(JSON.stringify(todos));
                this.todos = todos;
            },
            error => this.errorMessage = <any>error);
    }

}