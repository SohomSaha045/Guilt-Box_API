
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
    comments:[{
        message:{type:String}
    }]
},{timestamps:true}
);

module.exports={CollegeRoomSchema};