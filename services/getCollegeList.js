const { default: mongoose } = require("mongoose");
const collegeSchema =require("../models/College");
const getCollegeList = async ()=>{
    const data=await collegeSchema.find();
    console.log(data);
    return data;
}
module.exports={
    getCollegeList
}