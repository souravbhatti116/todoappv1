const _ = require('lodash');
const bodyParser = require('body-parser');   // to receive post requests
const express = require('express');
const app = express()
const date = require(__dirname + '/date.js')


////////////////////////////////////////////////////
const mongoose = require('mongoose');
const pass = "Atlas100RavB116"
// mongoose.connect("mongodb://localhost:27017/todoListDB");             // selection of the db.
mongoose.connect(`mongodb+srv://souravbhatti116:${pass}@mongodbsourav.827m2ne.mongodb.net/?retryWrites=true&w=majority`);             // selection of the db.

const itemsSchema = {
    name: String
}
const Item = mongoose.model("Item", itemsSchema);           // Model Set Up (Model name should be capitalized.) 

const listSchema = {
    name: String,
    items: [itemsSchema], 
}
const List = mongoose.model('list', listSchema);


/////////////////////////////////////////////////////

const item1 = new Item({
    name: "Item1"
})
const item2 = new Item({
    name: "Item2"
})
const item3 = new Item({
    name: "Item3"
})
const item4 = new Item({
    name: "Item4"
})

const defaultItems = [item1, item2, item3, item4]
/////////////////////////////////////////////////////
app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));



let user = "Sourav";

let day = date.getDate();
let time = date.getTime();




app.get('/', (req, res) => {

    Item.find()
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

    const itemName = req.body.newItem;
    const listName = req.body.listName;

    const item = new Item({
        name: req.body.newItem,  
    })
    
    if (listName === "Home") {
        item.save();
        res.redirect('/');
    } else {
        
        List.findOne({name: listName})
        .then((foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName );    
        })
    }
})




app.post('/delete', (req, res) => {
    const listName = req.body.listName
    const checkItemId = req.body.checkbox;
    if (listName === "Home") {

        Item.findByIdAndRemove(checkItemId)
        .then((err) => {
            console.log(err)
        })
        res.redirect('/')
        
    } else {
        List.findOneAndUpdate({name:listName}, {$pull: {items: {_id: checkItemId}}} )
        .then((foundlist) => {
            res.redirect('/' + listName);
        })
    }
    console.log(listName);
    console.log(checkItemId);

})

app.get('/:customListName', (req, res) => {
    
    const customListname  =  _.capitalize(req.params.customListName);
    
    List.findOne({name:customListname})
    .then((foundlist) => {
        if (!foundlist){
            console.log("Do not exist")
            //create a new list.
            let list = new List({
                name: customListname,
                items: defaultItems,
            })
            list.save();
            res.redirect('/' + customListname)

        }else{
            console.log("Exist")
            // Show an existing list.
            res.render('list',{            
                user: user,
                date: day,
                time: time,
                newItemsList: foundlist.items,
                listTitle: foundlist.name,
            } )
        }
    })
    
    
    

})


app.listen(3000, () => console.log("Server Started at 3000"));


