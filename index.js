// Import the Express module
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { SignIn } = require("./services/auth");
require("dotenv").config();
// Create an instance of the Express application
const { connection } = require("./connectMongo");
const { addCollege } = require("./services/addCollege");
const { addUsers } = require("./services/addUsers");
const { getCollegeList } = require("./services/getCollegeList");
connection(process.env.DB).then(() => {
  console.log("MongoDb Connected");
});
const app = express();
app.use(cors());
// Define a route for the root URL ("/")
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello, world! This is my Express app.");
});
app.get("/colleges", async (req, res) => {
  // const abc = await addCollege("Netaji Subhash Engineering College, Kolkata");
  // const x=abc._id.toString();
  // res.send("Get Colleges Data "+abc);
  const colleges=await getCollegeList();
  res.send(colleges);
});
app.post("/signUp", async (req, res) => {
  const { email, name, password } = req.body;
  let id=req.body.id;
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
  console.log(data.status);

  // database call to check if the email exists or not
  // if not add email and password to database
  //else return error
  //allot db
  const token = SignIn(email, name, id);
  res.cookie(token);
  res.send("success");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
