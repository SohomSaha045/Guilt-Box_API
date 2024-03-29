// Import the Express module
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { SignIn } = require("./services/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// Create an instance of the Express application
const {getMessages}=require('./services/getMessages');
const {getComments}=require('./services/getComments');
const {postMessages}=require('./services/postMessages');
const { connection } = require("./connectMongo");
const {authenticate}=require('./middlewares/autheticate');
const { addCollege } = require("./services/addCollege");
const { addUsers } = require("./services/addUsers");
const { getCollegeList } = require("./services/getCollegeList");
const { findUser } = require("./services/findUser");
connection(process.env.DB).then(() => {
  console.log("MongoDb Connected");
});
const app = express();
app.use(cors());
app.use(cookieParser());
// Define a route for the root URL ("/")
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello, world! This is my Express app.");
});
app.get("/colleges", async (req, res) => {
  const colleges=await getCollegeList();
  res.send(colleges);
});
app.get('/comments',authenticate,async(req,res)=>{
  const messageId=req.body.id;
  const roomId=req.id;
  const comments= await getComments(roomId,messageId);
  res.send({
    status:"scuccess",
    data:comments,
  })
});
app.post("/signUp", async (req, res) => {
  const { email, name, password } = req.body;
  let id=req.body.id;
  //id===0 if college not already exists
  if(id=="0"){
    const collegeName=req.body.collegeName;
    const room = await addCollege(collegeName);
    id=room;
  }
  const data=await addUsers({
    name:name,
    email:email,
    password:password,
    id:id
  });
  // console.log(data.status);
  res.send(
    {
      status:"success",
      data:data
    }
    );
});
app.get('/messages',authenticate,async (req,res)=>{
  const message=await getMessages(req.id);
  res.send(message);
})
app.post('/messages',authenticate,async (req,res)=>{
  const m=req.body.message;
  const message=await postMessages(req.id,req.name,m);
  // res.send("Working = "+req.name+" "+ req.id);
  res.send(message);
})

app.post('/messages',authenticate,async (req,res)=>{
  const message= await getMessages(req.id);
  res.send(message);
})
app.post('/login',async (req,res)=>{
  const {email,password} =req.body;
  const data= await findUser(email,password);
  if(data.status =="Success"){
    const result=data.data;
    const {name,roomId}=result;
    const token = SignIn(email, name, roomId);
    res.cookie("UserToken",token);
    res.status(200).send({
      status:"Success",
      result:result
    });
  }
  else if (data.status=="Incorrect Password"){
  res.status(500).send({
    status:data.status,
    result:null
  })
 }
 else{
  res.status(404).send({
    status:"Data not Found",
    result:null
  })
 }
  
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
