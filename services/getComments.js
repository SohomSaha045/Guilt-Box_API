const { mongoose } = require("mongoose");
const {CollegeRoomSchema}=require('./../models/CollegeRoom')


const getComments = async (roomId,messageId)=>{
  const messageSchema=await mongoose.model(roomId,CollegeRoomSchema);
  const comments= await messageSchema.find({
    _id:messageId
  });
  return comments[0].comments;

}
module.exports={getComments};