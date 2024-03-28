const { mongoose } = require("mongoose");
const userSchema = require("../models/User");

const addUsers = async({name,email,id,password})=>{
    try{
        const user=await userSchema.create({
            name:name,
            email:email,
            password:password,
            roomId:id
        });
        return (
            {
                status:"Success",
                user:user
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
module.exports={addUsers}