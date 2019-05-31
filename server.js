var express = require('express')
var app = express()

var data = require("./server.json")
// чтобы по дефолту отправлялся index.html

app.get('/', function (req, res) {
  res.sendfile('./dist/index.html')
});

// так расшаривается статика .html, css, картинки и т.п.
app.use(express.static('dist'));

//<< для кроссдоменных запросов
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options("/", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
//>> для кроссдоменных запросов

app.listen(3000, function(){
	console.log('Example app listening on port 3000!')
})

var CheckAuthorisation= function(login="", password="") {
    if (data.users[login] && data.users[login].password==password) {
        return true
    } else {
        return false
    }
}

var getTaskFromQuery = function (query) {
    let Task = {
        id: decodeURI(query.id),
        description: decodeURI(query.description),
        fullDescription: decodeURI(query.fullDescription),
        StartDate: decodeURI(query.StartDate),
        planeTime: decodeURI(query.planeTime),
        allottedTime: decodeURI(query.allottedTime),
        priority: decodeURI(query.priority),
        status: decodeURI(query.status)
    }
    return Task
}

// обработка входищих get запросов для тестового задания
app.get('/login', function (req, res) {
    if(CheckAuthorisation(req.query.login, req.query.password)) {
        res.send(JSON.stringify({
            "TasksList":data.users[req.query.login]["TasksList"]
        }))
    } else {
        res.send(JSON.stringify({ "errorMessage": "Ошибка авторизации, логин или пароль не могут быть пустыми" }))
    }

});

app.get('/taskList', function (req, res) {
    if(CheckAuthorisation(req.query.login, req.query.password)) {
        res.send(JSON.stringify({
            "TasksList":data.users[req.query.login]["TasksList"]
        }))
    } else {
        res.send(JSON.stringify({ "errorMessage": "Пустой пароль или логин" }))
    }
});

app.post('/updateTask', function (req, res) {
    if(CheckAuthorisation(req.query.login, req.query.password)) {
        let UpdatedTask = getTaskFromQuery(req.query)
        console.log(UpdatedTask)

        let TasksList = []
        TasksList = data.users[req.query.login]["TasksList"].map((Task)=>{
            if(UpdatedTask.id==Task.id) {
                return UpdatedTask
            }
            return Task
        })
        data.users[req.query.login]["TasksList"] = TasksList
        res.send(JSON.stringify({
            "TaskUpdated": 1,
            "TasksList":data.users[req.query.login]["TasksList"]
        }))
    } else {
        res.send(JSON.stringify({ "errorMessage": "Пустой пароль или логин" }))
    }
});

app.post('/addTask', function (req, res) {
    if(CheckAuthorisation(req.query.login, req.query.password)) {
        let NewTask = getTaskFromQuery(req.query)
        let TasksList = data.users[req.query.login]["TasksList"]
        let maxId = 0

        TasksList.map((Task)=>{
            if (Task.id>maxId) maxId = Task.id
        })

        NewTask.id = maxId+1
        TasksList.push(NewTask)

        data.users[req.query.login]["TasksList"] = TasksList
        res.send(JSON.stringify({
            "TasksList":data.users[req.query.login]["TasksList"]
        }))
    } else {
        res.send(JSON.stringify({ "errorMessage": "Пустой пароль или логин" }))
    }
});

app.post('/removeTask', function (req, res) {
    if(CheckAuthorisation(req.query.login, req.query.password)) {
        let TaskId = req.query.TaskId
        let TasksList = data.users[req.query.login]["TasksList"]
        data.users[req.query.login]["TasksList"] = TasksList.filter((Task)=>{
            if(Task.id==TaskId) return false
            return true
        })
        res.send(JSON.stringify({
            "TasksList":data.users[req.query.login]["TasksList"]
        }))
    } else {
        res.send(JSON.stringify({ "errorMessage": "Пустой пароль или логин" }))
    }
});