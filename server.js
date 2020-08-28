//server.js
//console.log('May node be with you')
const express = require('express')//its defination is written createApplication method which call internally and it is  in express file.
const bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient
const app = express()
const mongoose = require('mongoose')
app.use(app.router);
//const connectionString = 'mongodb+srv://yoda:008parttime@cluster0.ptkgj.azure.mongodb.net/<dbname>?retryWrites=true&w=majority'
//const url = 'mongodb://127.0.0.1:27017'
const url = 'mongodb://127.0.0.1:27017/game-of-thrones'
const dbName = 'game-of-thrones'
//let db
mongoose.connect(url , { useNewUrlParser: true })
const db = mongoose.connection;
  // db.once('open', _ =>{
  //   console.log('Database connected: ',url)
  // })
  // db.on('error' , err =>{
  //   console.error('connection error:', err)
  // })
  exports.teamlist = function(gname ,callback){
      db.once('open', function(){
        var teamSchema = new mongoose.Schema({
          name: String

        });
        var Team = mongoose.model('Team', teamSchema );
        Team.find({
          name : gname
        }, function(err , teams) {
          if (err) {
            onErr( err , callback);
          }else {
            mongoose.connection.close();
            console.log(teams);
            callback("" , teams);
          }
        });// end Team.find
      });// end db.once open 
    }

// MongoClient.connect(url , { useNewUrlParser: true }, (err,
// client) =>{
//     if(err) return console.log(err)

//     // Storing a reference to the database so you can use it later
//     db = client.db(dbName)
//     console.log(`Connected MongoDB: ${url}`)
//     console.log(`Database: ${dbname}`)
// })

app.listen(3000,function(){
    console.log('listening on 3000') 
})
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({extended : true}))//it is used so that bodyParser can pasrse any type of data and not only string

// All your handlers here...
//app.get('/', (req,res) => {/* ... */})


 // We normally abbreviate `request` to `req` and `response` to `res`.
 
 //app.post('/quotes', (req,res) => {//Path should be same as in index.html in action.
   //  console.log('Hellooooooooooooooooooo!')// this line will be displayed in command prompt
 //})
//  MongoClient.connect(connectionString,{
//      useUnifiedTopology : true})
//      .then(client => {
     
//      console.log('Connected to Database');
//      const db = client.db('star-wars-quotes')
//      const quotesCollection = db.collection('quotes')
 
//  .catch(error => console.error(error))
// })
app.get('/',  (req,res) => {
    //res.send('Hello world')
    res.sendFile(__dirname + '/index.html')//**Use 2 _
    // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
 })
//  app.post('/quotes', (req,res) => {
//     //console.log(req.body)
//     quotesCollection.insertOne(req.body)
//         .then (result => {
//             console.log(result)
//         })
//         .catch(error => console.error(error))
// })
 
    
 