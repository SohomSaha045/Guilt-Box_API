const { mongoose } = require("mongoose");
const {CollegeRoomSchema}=require('./../models/CollegeRoom')

const postMessages = async (id,name,message)=>{
  const messageSchema=mongoose.model(id,CollegeRoomSchema);
  try{
    const mess=await messageSchema.create({
        name:name,
        message:message,
        comments:[
            
        ]
    });
    return (
        {
            status:"Success",
            user:mess
        });
}
catch(err){
    console.log(err);
    return(
        {
            status:"Something went Wrong",
            error:err
        }
    );
}

}
module.exports={postMessages};