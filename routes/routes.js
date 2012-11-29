var redis = require("redis"),
    client = redis.createClient();

exports.todo = function(req, res) {
    console.log('hoge');

    var todos = [];
    client.hgetall("Todo", function(err, objs) {

        for (var k in objs) {
            todos.push({text: objs[k]});
        }

        res.render('todo', {
            title: 'New Todo List',
            todos: todos
        });
    });
};

exports.saveTodo = function(req, res) {
    var newTodo = {};
    newTodo.name = req.body['todo-text'];
    newTodo.id = newTodo.name.replace(" ", "-");
    client.hset("Todo", newTodo.id, newTodo.name);
    res.redirect("back");
};


