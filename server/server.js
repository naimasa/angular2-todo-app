/**
 * Copyright (C) 2016 Masaki Naito
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * modified from:
 * Node.js + Express 4.x + MongoDB(Mongoose)でRESTfulなjsonAPIサーバの作成を丁寧に解説する．+ テストクライアントを用いたAPIテストまで - Qiita http://qiita.com/shopetan/items/58a62a366aac4f5faa20
 */

// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// DBへの接続
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jsonAPI');

// モデルの宣言
var Todo = require('./app/models/todo');

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORSを許可する
// modified from: expressにてCORSを許可する - Qiita http://qiita.com/tomoya_ozawa/items/feca4ffc6217d585b037
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});

// 3000番を指定
var port = process.env.PORT || 3000;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});


// /Todos というルートを作成する．
// ----------------------------------------------------
router.route('/todos')

    // ユーザの作成 (POST http://localhost:3000/api/todos)
    .post(function (req, res) {

        // 新しいユーザのモデルを作成する．
        var todo = new Todo();

        // ユーザの各カラムの情報を取得する．
        //todo.id = req.body.id;
        //todo.title = req.body.title;
        //todo.complete = req.body.complete;
        Object.assign(todo, req.body);

        // ユーザ情報をセーブする．
        todo.save(function (err) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    })

    // 全てのユーザ一覧を取得 (GET http://localhost:3000/api/todos)
    .get(function (req, res) {
        Todo.find(function (err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });

// /todos/:id というルートを作成する．
// ----------------------------------------------------
router.route('/todos/:id')

    // 1人のユーザの情報を取得 (GET http://localhost:3000/api/todos/:id)
    .get(function (req, res) {
        //idが一致するデータを探す．
        //Todo.findById(req.params.id, function (err, todo) {
        Todo.findOne({ id: req.params.id }, function (err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    })

    // 1人のユーザの情報を更新 (PUT http://localhost:3000/api/todos/:id)
    .put(function (req, res) {
        //console.log("id=" + req.params.id);
        //Todo.findById(req.params.id, function (err, todo) {
        Todo.findOne({ id: req.params.id }, function (err, todo) {
            if (err)
                res.send(err);
            // ユーザの各カラムの情報を更新する．
            //console.log(todo);
            //if (req.body.id != null) todo.id = req.body.id;
            //if (req.body.title != null) todo.title = req.body.title;
            //if (req.body.complete != null) todo.complete = req.body.complete;
            Object.assign(todo, req.body);

            todo.save(function (err) {
                if (err)
                    res.send(err);
                res.json(todo);
            });
        });
    })

    // 1人のユーザの情報を削除 (DELETE http://localhost:3000/api/todos/:id)
    .delete(function (req, res) {
        Todo.remove({
            id: req.params.id
        }, function (err, todo) {
            if (err)
                res.send(err);
            res.json({ id: req.params.id });
        });
    });


// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
