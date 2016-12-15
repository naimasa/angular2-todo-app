# Angular2TodoApp

A sample TODO application with MongoDB (Mongoose) + Exress + Angular2 + Node.js.

Modified from:
- [Angular 2 Tutorial: Create a CRUD App with Angular CLI](https://www.sitepoint.com/angular-2-tutorial/)
- [sitepoint-editors/angular2-todo-app: Angular 2 Todo Application](https://github.com/sitepoint-editors/angular2-todo-app)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Installation

### angular2-todo-app
```
$ git clone https://github.com/naimasa/angular2-todo-app
$ cd angular2-todo-app
$ npm install
```

### MongoDB
[Install MongoDB — MongoDB Manual 3\.4](https://docs.mongodb.com/manual/installation/)

```
$ mongod
$ mongo
> use jsonAPI
> db.createCollection('todo')
{ "ok" : 1 }
> show collections
todo
> quit()
```

## Usage

### DB
```
$ mongod
```

### server (express)
```
$ cd angular2-todo-app/server
$ node server.js
```

### server (angular2)
```
$ cd angular2-todo-app
$ ng serve
```

### Browser
Just access to `http://localhost:4200/`

### Client
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The MIT License (MIT)
Copyright (c) 2016 Masaki Naito

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.