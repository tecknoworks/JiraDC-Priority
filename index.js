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
var mongoDB = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/priority', async (req, res) => {
    let newPriority = req.body
    var addPriority=new Priority({ name:newPriority.name})
    await Priority.create(addPriority)
    res.send(newPriority)
})
app.post('/allPriorities', async (req, res) => {
    let result = [];
    console.log(req.body)
    if (req.body.length) {
        for (let index = 0; index < req.body.length; index++) {
            if(req.body[index]!==''){
                const issue = await Priority.find({ '_id': req.body[index] })
                result.push(issue[0]);
            }else{
                result.push({name:"noPriority"});
            }
        }
    }
    res.json(result)
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
