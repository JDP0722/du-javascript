

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/name', function(req, res) {
    const name = 'Jacob Payne'
    res.send(name)
})

app.post('/echo-body', function (req, res) {

    const body = req.body;

    console.log(body);

    res.send(body);

});


app.post('/echo-query', function (req, res) {

    const query = req.query;

    console.log(query);

    res.send(query);

});

const users = [];
app.post('/users', function (req, res) {
    const {name, age, gender} = req.body;
    if (!name) {
        return res.status(400).send("Name too falsey.")
    }
    else if (!age) {
        return res.status(400).send("Age too falsey.")
    }
    const user = {
        id : users.length+1,
        name : name,
        age: age,
        gender: gender,
        createdDate: new Date()
    }
    users.push(user);
    res.send(user);
});

app.get('/users', function (req, res) {
        res.send(users);
});

app.get('/user', function (req, res) {
    const { id } = req.query;
    const user = users.find(user => user.id == id);
    res.send(user);
});
    

app.get('/users/:index', function (req, res) {
    const { index } = req.params;
    const user = users[index];
    res.send(user);
});
    
    


app.listen(3000)
console.log("App now listening at https://localhost:3000")