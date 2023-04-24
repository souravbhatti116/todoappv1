const bodyParser = require('body-parser');   // to receive post requests
const express = require('express');
const app = express()
const date = require(__dirname + '/date.js')


////////////////////////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todoListDB");             // selection of the db.

const itemsSchema = {
    name: String
}

const ToDoItems = mongoose.model("ToDoItem", itemsSchema);           // Model Set Up (Model name should be capitalized.) 
/////////////////////////////////////////////////////

app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));



let user = "Sourav";

let day = date.getDate();
let time = date.getTime();




app.get('/', (req, res) => {

    ToDoItems.find()
    .then((items) => {
        res.render('list', {
            user: user,
            date: day,
            time: time,
            newItemsList: items,
            listTitle: "Home",
        });
    })

})


app.post('/', (req, res) => {
    
    let newItem = new ToDoItems({
        name: req.body.newItem,  
    })
    newItem.save();
    res.redirect('/');
})




app.post('/delete', (req, res) => {
    
    const checkItemId = req.body.checkbox;
    ToDoItems.findByIdAndRemove(checkItemId)
    .then((err) => {
        console.log(err)
    })
    res.redirect('/')
})

app.get('/:customListName', (req, res) => {
    const customListname  =  req.params.customListName;
    
})


app.listen(3000, () => console.log("Server Started at 3000"));


