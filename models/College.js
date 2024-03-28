const mongoose = require('mongoose');

const CollegeSchema =new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        unique:true
    }
}
);

const collegeSchema=mongoose.model('colleges',CollegeSchema);
module.exports=collegeSchema;