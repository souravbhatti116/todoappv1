const bodyParser = require('body-parser');
const express = require('express');
const bodyparser = require('body-parser');
const app = express()
const date = require(__dirname + '/date.js')

app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

const items = [];
const workItems = [];

let user = "Sourav";

let day = date.getDate();

app.get('/', (req, res) => {
    console.log(date.getDay())
    res.render('list', {
        user: user,
        date: day,
        newItemsList: items,
        listTitle: "Home",
    });
})

app.post('/', (req, res) => {
    let newItem = req.body.newItem;

    if (req.body.list === "Work")  {
        workItems.push(newItem);
        res.redirect('/work');
    } else {
        items.push(newItem);
        res.redirect('/');
    }
})

app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: "Work",
        newItemsList: workItems,
        user:user,
        date: day,
    })
})

app.post('/work', (res, req) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.listen(3000, () => console.log("Server Started at 3000"));
