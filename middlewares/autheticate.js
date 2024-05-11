const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  // console.log(req);
  var cookie = req.cookies.UserToken;

  //  console.log(cookie);
  const cok=req.headers['authorization']
  console.log(cok);
  if ( !cok) {
  // if ( !req.myHeader) {
    res.send({
      status: "User not Authenticated",
    });
    return;
  } else {
    cookie=cok;
    try {
      const ex = jwt.verify(cookie,process.env.privatekey);
      console.log(ex);
      req.id = ex.db;
      req.name = ex.name;
    } catch (err) {
      console.log({
        status: "Invalid Token",
      });
      res.send({
        status: "Invalid Token",
      });
      return;
    }
  }
  next();
};
module.exports = {
  authenticate,
};
