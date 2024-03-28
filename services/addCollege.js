const { mongoose } = require("mongoose");
const collegeSchema=require('./../models/College');
const CollegeRoomSchema=require('./../models/CollegeRoom');
const addCollege = async(name)=>{
    var college=await collegeSchema.create({
        name:name
    });
    const id=college._id.toString();
    newCollections(id)
    return id;
}
const newCollections=async(CollectionName)=>{
    const collegeSchema=mongoose.model(CollectionName,CollegeRoomSchema);
}
module.exports={
    addCollege 
}