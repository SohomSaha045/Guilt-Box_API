
const mongoose = require('mongoose');

const CollegeRoomSchema =new mongoose.Schema(
    {
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    comments:[
    {
        name:String,
        message:String
    },{timestamps:true}
   ]
},{timestamps:true}
);

module.exports={CollegeRoomSchema};