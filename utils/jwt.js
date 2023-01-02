const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenTtl = "1w";

exports.generateAccessToken=(user)=> {
    try{
  return jwt.sign({ ...user }, accessTokenSecret, {
    expiresIn: accessTokenTtl,
  });
    }catch(err){
return err
    }

}

exports.verifyJwt=(token)=> {
  try {
    const decoded = jwt.verify(token, accessTokenSecret);

    if (decoded) {
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } else {
      return {
        valid: false,
        expired: "invalid accessToken",
        decoded: null,
      };
    }
  } catch (e) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
