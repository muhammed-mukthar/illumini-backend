const { verifyJwt } = require("../utils/jwtUtil");
const { get }  =require("lodash");

module.exports.VerifyToken = async (
  req,res,next
  ) => {
    const accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      ""
    );
    if (!accessToken) {
      res.status(403).json({err:'you are not permited '})
    }else{
      const { decoded, expired } = verifyJwt(accessToken, "accessTokenSecret");
    if (decoded) {
     
      req.user = decoded;
      return next();
    }else if (expired) {
      res.status(403).json({err:'Please login again'})
    }
    }
  };
  