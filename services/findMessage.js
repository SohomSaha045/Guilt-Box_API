const { mongoose } = require("mongoose");
const { CollegeRoomSchema } = require("../models/CollegeRoom");

const findMessage= async (roomId,messageId)=>{
    const messageSchema=await mongoose.model(roomId,CollegeRoomSchema);


    try{
        const data=await messageSchema.find({
            _id:messageId
        }
        );
        
        
        return (
                {
                    status:"Success",
                    data:data
                }
            )
        
    }catch(err){
        return (
            {
                status:"Something went Wrong",
                data:err
            }
        )
    }    
}
module.exports={findMessage};