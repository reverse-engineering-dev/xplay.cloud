const logger = require("../../winston/logger");

module.exports = async (req, res, next) => {
  try {
    let user = req.user;
    const { body } = req

    user.updateClientData({
      xboxId: body.xboxId,
      xboxIp: body.xboxIp,
      raspberryLocalIp: body.raspberryLocalIp,
      network: body.network
    });

    const data = {
      clientConfig: {
        network: user.clientConfig.network,
        xboxId: user.clientConfig.xboxId,
        xboxIp: user.clientConfig.xboxIp,
        raspberryLocalIp: user.clientConfig.raspberryLocalIp,
      },
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      email: user.email,
    };

    res.json({
      status: "Success!",
      user: data,
      message: {
        status: 200,
        messageText: "Success, user client data updated!",
      },
    });

  } catch (err) {
    console.log('err', err)
    logger.error(err);
    next(err);
  }
};
