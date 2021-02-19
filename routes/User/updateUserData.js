const logger = require("../../winston/logger");
const path = require('path')


module.exports = async (req, res, next) => {
  try {
    let user = req.user
    const { body } = req
    console.log('req.file', req.file)

    user.updateUserData(body);

    if (req.file) {
      user.updateAvatar(path.join('/avatar', req.file.filename))
    }

    const { firstname, lastname, _id, email, nickname, avatar } = user

    res.json({ firstname, lastname, _id, email, nickname, avatar: avatar.url })
  } catch (err) {
    console.log('err', err)
    logger.error(err);
    next(err);
  }
};
