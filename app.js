var express=require("express");
var mysql=require("mysql");
var mysqljson=require("mysql-json");
var app=express();
var bodyparser=require("body-parser");
var path=require("path");
var sjs=require("safe-json-stringify");
var cjson=require("circular-json");
var util = require("util");
var AWS = require("aws-sdk");
var async=require("async");
var wait=require("wait.for");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));
var db=mysql.createConnection({
  host:"cloudcomputing.cac1rbhzit0u.ap-south-1.rds.amazonaws.com",
  user:"root",
  password:"Gaugam1998",
  database:"cloudcomputing"
})
db.connect(function(err) {
  if (err){
    console.log("ERROR");
  }
  else{
    var sql="create table if not exists bloodbank(name varchar(255),age varchar(255),bloodgroup varchar(255),phone varchar(255),place varchar(255))";
    db.query(sql, function (err, res){
      if (err) throw err;
      console.log("Connection to the database is done");
    });
  }  
});
app.get("/", function (req, res) {
  res.render("startpage.ejs",{root:path.join(__dirname,'./views')});
});
app.get("/newdonor",function(req,res){
  res.render("adddonor.ejs",{root:path.join(__dirname,'./views')});
});
app.get("/finddonors",function(req,res){
  res.render("getdonors.ejs",{root:path.join(__dirname,'./views')});
});
app.post("/newdonor",function(req,res){
  //add data to database
  var name=req.body.name;
  var age=req.body.age;
  var bloodgroup=req.body.bloodgroup;
  var phone=req.body.phone;
  var place=req.body.place;
  var sql = "INSERT INTO bloodbank(name,age,bloodgroup,phone,place)VALUES('"+name+"','"+age+"','"+bloodgroup+"','"+phone+"','"+place+"')";
  db.query(sql, function (err, res){
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.render("startpage.ejs",{root:path.join(__dirname,'./views')});
});
app.post("/finddonors",function(req,res){
  //retrieve data from database
  var bloodgroup=req.body.bloodgroup;
  //console.log(bloodgroup);
  var i=0;
  var names=[];
  var ages=[];
  var bloodgroups=[];
  var phones=[];
  var places=[];
  var sql = "SELECT * FROM bloodbank WHERE bloodgroup='"+bloodgroup+"'";
  db.query(sql, function (err, res1){
    if (err) throw err;
    //console.log(res1.length);
    for(i=0;i<res1.length;i++){
      //console.log(res1[i].name);
      names[i]=res1[i].name;
      ages[i]=res1[i].age;
      bloodgroups[i]=res1[i].bloodgroup;
      phones[i]=res1[i].phone;
      places[i]=res1[i].place;
    }
    //console.log(names.toString());
    var n=names.toString();
    var a=ages.toString();
    var bgs=bloodgroups.toString();
    var ps=phones.toString();
    var pls=places.toString();
    res.render("showdonors.ejs",{donors:n,ages:a,bloodgroups:bgs,phones:ps,places:pls,blood:bloodgroup});
  });
  //console.log(names[1]);
  //console.log(names[0]);
});
app.listen(8000,function(){
    console.log("server is started.........");
});