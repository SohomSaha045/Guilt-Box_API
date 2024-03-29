const { mongoose } = require("mongoose");
const {CollegeRoomSchema}=require('./../models/CollegeRoom')

const getMessages= async (id)=>{
    const messageSchema=mongoose.model(id,CollegeRoomSchema);
  const message=await messageSchema.find({});
  return message;
}
module.exports={getMessages};