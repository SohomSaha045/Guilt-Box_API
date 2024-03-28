// Import the Express module
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { SignIn } = require("./services/auth");
require('dotenv').config();
// Create an instance of the Express application
const { connection } = require("./connectMongo");
connection(process.env.DB).then(() => {
  console.log("MongoDb Connected");
});
const app = express();
app.use(cors());
// Define a route for the root URL ("/")
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello, world! This is my Express app." + results);
});
app.post("/signUp", (req, res) => {
  const {email,name,password}= req.body;
  
  // database call to check if the email exists or not
  // if not add email and password to database
  //else return error
  //allot db
  let db = "1001";
  const token=SignIn(email,name,db);
  res.cookie(token);
  res.send("ss");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
