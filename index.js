const express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const Priority = require('./models/priority')
const port = 8085
var mongoDB = 'mongodb+srv://Damaris:12345@cluster0.gdp4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/priority', async (req, res) => {
    let newPriority = req.body
    var addPriority=new Priority({ name:newPriority.name})
    await Priority.create(addPriority)
    res.send(newPriority)
})

app.get('/priority', async (req, res) =>{
    // const record= await Project.find({'type':req.query.type}).exec()
    const record= await Priority.find({})
    console.log(record)
    res.json(record)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
