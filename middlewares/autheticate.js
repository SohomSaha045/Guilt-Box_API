const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next)=>{
    var cookie = req.cookies.UserToken;
    console.log(cookie);
    if(!cookie){
        res.send({
            status:"User not Authenticated"
        });
    }
    try{
        const ex=jwt.verify(cookie,process.env.privatekey);
        console.log(ex);
        req.id=ex.db;
        req.name=ex.name;
    }
    catch(err){
        console.log(
        {
                status :"Invalid Token"
        }
        );
    }
    next();
}
module.exports={
    authenticate
}