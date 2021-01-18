require("rooty")();
const jwt = require("jsonwebtoken");
const Player = require("^/database/models/Player");

const tokenLife = process.env.TOKEN_LIFE;
const tokenSecret = process.env.TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = async (req, res, next) => {
  const resUnauthorized = (msg = "Unauthorized user!") => {
    res.status(401).json({
      status: 401,
      msg,
    });
  };

  //TODO - add token in blacklist
  try {
    const {refreshToken} = req.body

    if (!refreshToken) {
      return resUnauthorized();
    }

    jwt.verify(refreshToken, refreshTokenSecret, async (err, payload) => {
      console.log('err', err) 
      console.log('payload', payload)
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          //token expired
          return resUnauthorized("Expired jwt!");
        } else if (err instanceof jwt.JsonWebTokenError) {
          //invalid token
          return resUnauthorized("Invalid jwt!");
        } else {
          return resUnauthorized();
        }
      }

      const player = await Player.findUserByID(payload.uid);

      if (player.refreshToken !== refreshToken) {
        return resUnauthorized();
      }

      const tokenPayload = {
        uid: payload.uid,
        ip: req.ip
      };

      const token = jwt.sign(tokenPayload, tokenSecret, {
        expiresIn: tokenLife,
      });

      const newRefreshToken = jwt.sign(tokenPayload, refreshTokenSecret, {
        expiresIn: refreshTokenLife,
      });

      player.refreshToken = newRefreshToken;
      await player.save();

      res.json({
        message: {
            status: 200,
            msg: 'Refresh token succes!'
        },
        token,
        expiresIn: Date.now() + parseInt(tokenLife),
        refreshToken: newRefreshToken,
      });
    });
  } catch (e) {
    console.log(e);
    resUnauthorized();
  }
};
