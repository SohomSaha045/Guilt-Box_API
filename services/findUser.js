const { mongoose } = require("mongoose");
const userSchema =require("../models/User");


const findUser= async (email,password)=>{
    try{
        const data=await userSchema.find({
            email:email
        }
        );
        if(data[0].password==password){
            return (
                {
                    status:"Success",
                    data:data[0]
                }
            )
        }
        else{
            return (
                {
                    status:"Incorrect Password",
                    data:{}
                }
            )
        }
    }catch(err){
        return (
            {
                status:"Something went Wrong",
                data:err
            }
        )
    }    
}
module.exports={findUser};