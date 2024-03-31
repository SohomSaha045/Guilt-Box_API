const jwt = require('jsonwebtoken');


function SignIn(email,name,db){
    const payload={
        email,
        name,
        db
    }
    console.log(process.env.DB)
    return jwt.sign(payload,process.env.privateKey);
}
module.exports ={
    SignIn
}