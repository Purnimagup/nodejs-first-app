import  express from "express";
import mongoose from "mongoose";
import cookies from "cookie-parser";
import cookieParser from "cookie-parser";
import jwt from  "jsonwebtoken";
import bcrypt from "bcrypt";
//import path from "path";
//import "./public/style.css";

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
}).then(c=>console.log("database connected"))
.catch((err)=>console.log(err));

/*const messageschema = new mongoose.Schema({
    name:String,
    email:String,
});*/

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

//const Message = mongoose.model('Message', messageschema);
const User = mongoose.model('User', userschema);

const app = express();
//const Users = [];

const isauthenticated = async (req, res, next) =>{
    //console.log(req.cookies);

    const {token} = req.cookies;

    if(token) {
       
      const decode =  jwt.verify(token,"fxfcvcbdbsviygsdvbhsgjvh");
     console.log(decode);

     req.user = await User.findById(decode._id);

        res.render('logout');
    }else{
        res.render('login');
    }
};

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//setting up view engine
app.set("view engine", "ejs");
//app.use(express.static(path.join(path.resolve(),"public")));

app.get('/', isauthenticated,(req, res,next) => {
  //console.log(req.user);
    res.render('logout',{name:req.user.name});

   /* console.log(req.cookies);

    const {token} = req.cookies;

    if(token) {
    
        res.render('logout');
    }else{
        res.render('login');
    }
*/
   // res.send("hii");
 //res.render('index');
 // res.redirect('/success');
});

app.post('/register', async (req, res) => {
 //console.log(req.body);

// const {name,email} = req.body;
const hashpassword = await bcrypt.hash(req.body.password,10);

const messagedata = {name: req.body.name, email: req.body.email,password: hashpassword};

  let use = await User.findOne({email: req.body.email});
  if(use)
  {
    return res.redirect('/login');
  }

  const user = await User.create(messagedata);

  const token = jwt.sign({_id: user._id}, "fxfcvcbdbsviygsdvbhsgjvh");
  console.log(token);

    res.cookie("token",token,
    //"iam in"
    {
        httpOnly: true,
        expires: new Date(Date.now()+60*1000)
    });
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.redirect('/');
});

app.get('/register',  (req, res) => {
res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
})


app.post('/login',async  (req, res) => {
 
       const messagedata = {name: req.body.name, email: req.body.email};

       let use = await User.findOne({email: req.body.email});
   
       if(!use)
       {
        return res.redirect("/register");
       }
       
       // const ismatch = use.password === req.body.password;
       const ismatch = await bcrypt.compare(req.body.password, use.password);
       
       if(!ismatch) return res.render("login",{message :"Incorrect password"});

    const user = await User.create(messagedata);
  const token = jwt.sign({_id: user._id}, "fxfcvcbdbsviygsdvbhsgjvh");
  //  console.log(token);
  
      res.cookie("token",token,
      //"iam in"
      {
          httpOnly: true,
          expires: new Date(Date.now()+60*1000)
      });
      res.redirect('/');
    });


/*
app.get('/add', async (req, res) => {
   await Message.create({name:"Abhi",email:"abhi@gmail.com"});
   // Message.create({name:"Abhi",email:"abhi@gmail.com"}).then(() => {
        res.send("nice");
   // });
   
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.post('/contact',async (req, res) => {

    //const {name,email} = req.body
    console.log(req.body.name);

    const messagedata = {name: req.body.name, email: req.body.email};
    console.log(messagedata);

    await Message.create(messagedata);

    //Users.push({username: req.body.name, email: req.body.email});
    //console.log(Users);
   // res.render('success');
   res.redirect('/success');
});

//array stored for use as database
app.get('/Users',(req,res)=>{
  res.json({
    Users,
  });
});
*/
app.listen(5000,()=>{
    console.log("server listening on port");
;})













//console.log("hello world");
//const a =23;
//console.log(a
//console.log("please subscribe to 6 prograaame");
//console.log(window);
// const a= 400
/*
const a = {
    average:(a,b)=>{
        console.log((a+b)/2);
    },
    percent:(a,b)=>{
        console.log((a/b)*100);
    }
};




module.exports = a;*/

//const { readFileSync } = require("fs");

// file based ,build in,third party

//const fs = require("fs");

//console.log(fs);
/*fs.readFile("./sample.txt","utf-8",(err,data)=>{
    if(err)
    {
        throw err;
    }
    console.log(data);

});*/
//const {readFileSync} = require("fs");

//const a = fs.readFileSync("./sample.txt","utf-8");
//const a = readFileSync("./sample.txt","utf-8");
//const a = "this is agchg boy";
/*fs.writeFile("./sample.txt",a,()=>{
    console.log("written");
});*/
//fs.writeFilesync("./sample.txt",a);


//console.log(a);

//console.log("I am first");

//const path = require("path");

//const a = path.extname("/node/index.js");
//const a = path.basername(" C:/Users/Admin/Desktop/nodejs");

//const a = path.dirname(" C:/Users/Admin/Desktop/nodejs");
//b = "/6pp";
//const a = path.join(" C:/Users/Admin/Desktop/nodejs"+b);


//console.log(a);
////const os = require("os");

//console.log(os.totalmem());

//const pokemon = require("pokemon");

//console.log(pokemon.all())
//const { response } = require("express");
/*const http = require("http");

const PORT = 2000;
const hostname = "localhost";

const server = http.createServer((req,res)=>{
   console.log(req.url);
 res.end("<h1>hello world</h1>");
});

server.listen(PORT,hostname,()=>{
    console.log(`server is working on http://${hostname}:${PORT}`);
});*/




