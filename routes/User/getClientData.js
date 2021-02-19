
module.exports = async (req, res, next) => {
  try {
    console.log('req.user', req.user)
    let { clientConfig, _id, firstname, lastname, email, nickname, avatar } = req.user
    const { xboxId, xboxIp, raspberryLocalIp, network } = clientConfig

    const userData = {
      clientConfig: {
        network,
        xboxId,
        xboxIp,
        raspberryLocalIp,
      },
      _id,
      firstname,
      lastname,
      nickname,
      email,
      avatar: avatar.url
    };

    res.json({
      status: "Success!",
      user: userData,
      message: {
        status: 200,
        messageText: "Success, user client data updated!",
      },
    });
  } catch (err) {
    console.log("err", err);
    logger.error(err);
    next(err);
  }
};
