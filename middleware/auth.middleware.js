require("rooty")();
const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET
const User = require("^/database/models/Player");
const JwtBlackList = require("^/database/models/jwtBlackList");

module.exports = async (req, res, next) => {
  const resUnauthorized = (msg = "Not authorized!") => {
    res.status(401).json({
      message: {
        status: 401,
        msg: "Authorization error!",
      },
    });
  };

  try {
		const token = req.headers["authorization"].split(" ")[1];
		
    // if (!token || await JwtBlackList.findToken(token)) {
    //     return resUnauthorized()
    // }

    try {
      jwt.verify(token, secret, async (err, payload) => {
        if (!err) {
          if (payload) {
            console.log("payload", payload);
            req.user = await User.findUserByID(payload.uid);
          }
          next();
        } else {
          console.log(err);
          resUnauthorized();
        }
      });
    } catch (e) {
      resUnauthorized();
    }
  } catch (e) {
    resUnauthorized();
  }
};
