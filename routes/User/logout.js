require("rooty")();
const jwtBlackList = require("^/database/models/jwtBlackList");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const blackToken = new jwtBlackList({
        token,
      });
      await blackToken.save();
      return res.status(200).json({
        message: {
          status: 200,
          msg: "Logout succes!",
        },
      });
    }

    res.status(200).json({
      message: {
        status: 200,
        msg: "Logout succes!",
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
