/**
 * Copyright (C) 2016 Masaki Naito
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php 
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TodoAppComponent } from './todo-app/todo-app.component';

@NgModule({
  declarations: [
    TodoAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [TodoAppComponent]
})
export class AppModule { }
