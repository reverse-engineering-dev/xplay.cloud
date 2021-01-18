const logger = require("../../winston/logger");

module.exports = async (req, res, next) => {
  try {
    let user = req.user;

    const {
      networkId,
      xboxId,
      xboxIp,
      raspberryZerotierIp,
      raspberryLocalIp,
      zerotierIp,
    } = req.body;

    user.updateClientData({
      networkId,
      xboxId,
      xboxIp,
      raspberryZerotierIp,
      raspberryLocalIp,
      zerotierIp,
    });

    const data = {
      clientConfig: {
        networkId: user.clientConfig.networkId,
        xboxId: user.clientConfig.xboxId,
        xboxIp: user.clientConfig.xboxIp,
        raspberryZerotierIp: user.clientConfig.raspberryZerotierIp,
        raspberryLocalIp: user.clientConfig.raspberryLocalIp,
        zerotierIp: user.clientConfig.zerotierIp,
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
    console.error(err);
    logger.error(err);
    next(err);
  }
};
