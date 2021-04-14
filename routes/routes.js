const Router = require("express").Router;
const router = new Router();
const validationErrors = require("../middleware/validation.middleware");
const auth = require("../middleware/auth.middleware");
const { body } = require("express-validator");
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
const uploadMiddleware = require('../middleware/files-upload.middleware')

const withSockets = (io) => {
  //CLIENT
  router.put('/client/hello', [auth], (req, res, next) => {
    const user = req.user
    user.configureClient()

    res.json({
      success: true,
      msg: 'Client was set as configured! '
    })
  })

  //XBOX
  router.post('/console/power', [auth], require('./Console/power')(io))
  router.post('/console/power-on', [auth], require('./Console/tryPowerOn')(io))
  router.get("/console/data", [auth], require("./Console/getXboxData")(io));
  router.get("/console/:id", [auth], require("./Console/getConsole"));
  router.post("/raspberry", [auth], require("./Raspberry/addRaspberry"));
  router.post("/console", [auth], require("./Console/addConsole"));
  router.put("/console/status/:id", [auth], require("./Console/changeStatus"));
  router.delete("/console/:id", [auth], require("./Console/deleteConsole"));

  //RASPBERRY
  router.get('/raspberry/xbox-id', [auth], require('./Raspberry/getXboxId')(io))
  router.post('/raspberry/join/:network', [auth], require('./Raspberry/joinNetwork')(io))
  router.post('/raspberry/reboot', [auth], require('./Raspberry/reboot')(io))
  router.get('/raspberry/local-ip', [auth], require('./Raspberry/getRaspberryLocalIp')(io))
  router.get("/raspberry/:id", [auth], require("./Raspberry/getRaspberry"));
  router.get("/raspberry/zerotier/:id", [auth], require("./Raspberry/getZerotierId"));
  router.put("/raspberry/zerotier/:id", [auth], require("./Raspberry/updateZerotierId"));
  router.delete("/raspberry/:id", [auth], require("./Raspberry/deleteRaspberry"));

  //USER
  router.post(
    "/user",
    //   [
    //     body("firstname").notEmpty().withMessage("Invalid firstname"),
    //     body("lastname").notEmpty().withMessage("Invalid lastname"),
    //     body("nickname").notEmpty().withMessage("Invalid username"),
    //     body("email").isEmail().withMessage("is not a valid email!"),
    //     body("password")
    //       .isLength({ min: 6 })
    //       .matches(passRegex)
    //       .withMessage("Invalid password!"),
    //     body("confirmPassword")
    //       .isLength({
    //         min: 6,
    //       })
    //       .withMessage("Password confirm must be between 6 and 32 characters!")
    //       .custom((confirmPassword, { req }) => {
    //         if (confirmPassword === req.body.password) {
    //           return true;
    //         }
    //         throw new Error("Password and password confirmation doesn't match");
    //       }),
    //     validationErrors,
    //   ],
    require("./User/register")
  );
  router.put("/user/client", [auth], require("./User/updateClientData"));
  router.get("/user/client", [auth], require("./User/getClientData"));
  router.get("/user/:id", [], require("./User/getUser"));
  router.delete("/user/:id", [auth], require("./User/deleteUser"));
  router.put("/user/zerotier", [auth], require("./User/changeZerotierId"));
  router.put("/user/playtime", [auth], require("./User/setPlaytime"));
  router.put('/user', [auth, uploadMiddleware.single('avatar')], require('./User/updateUserData'))

  //WORKER
  router.post("/worker/register", [], require("./Worker/register"));
  router.get("/worker/:id", [], require("./Worker/getWorker"));
  router.delete("/worker/:id", [], require("./Worker/deleteWorker"));

  //auth
  router.post("/token/refresh", require("./Auth/refreshToken"));
  router.post("/logout", [auth], require("./User/logout"));
  router.post(
    "/login",
    [
      body("nickname").notEmpty().withMessage("Invalid nickname!"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password length must be between 6 and 32 characters!"),
      validationErrors,
    ],
    require("./Auth/login")
  );

  router.put(
    "/change-pass",
    [
      auth,
      // body("password").notEmpty().withMessage("Invalid nickname!"),
      // body("newPassword")
      //   .matches(passRegex)
      //   .withMessage("Invalid password!")
      //   .custom((newPassword, { req }) => {
      //     if (newPassword === req.body.confirmPassword) {
      //       return true;
      //     }
      //     throw new Error("New password and password confirmation doesn't match");
      //   }),
      // validationErrors,
    ],
    require("./User/changePass")
  );

  //logs
  router.use("/log", require("./Logs/log"));

  //play
  // router.post('/play', [auth], require('./Play/play'))
  router.get('/avatar/:file', require('./FilesServing/avatar'))

  return router
}


module.exports = withSockets;
