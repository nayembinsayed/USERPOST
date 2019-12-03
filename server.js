var http = require('http');
var mongoose = require ('mongoose');
var mongo=require('mongodb');
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
 
  
var db, uri = mongoose.connect("mongodb://" + process.env.IP + "/blog");

mongoose.connection.on('error',function(){
   console.log('Could not connect to mongodb');
 });
 
 var userSchema = new mongoose.Schema({
 name:String,
 email: String,
 description: String
 });
 
 var User = mongoose.model('User', userSchema);
 
  var save = function(form_data){
    db.createCollection('users',function(err,collection){ if (err) throw err;});
    var collection = db.collection('users');
    collection.save(form_data);
    
  }
  
 var server = http.Server(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  

  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  });
  


app.post('/submit_user',function(req, res){
  console.log(req.body);
   save(req.body);
  res.status('200');
});

 
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
