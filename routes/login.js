const express = require("express");
const router = express.Router();
const SteamUser = require("steam-user");

const user = new SteamUser;


router.get("/", (_, res) => {
  res.send("post");
});

router.post("/", (req, res) => {

  const param = req.body;

  user.logOn({
    accountName: param.username,
    password: param.password,
    twoFactorCode: param.authCode,
    rememberPassword: param.rememberPassword,
    loginKey: param.loginKey,
    shared_secret: param.shared_secret
  });

  user.getAuthSecret((err, id, key) => {
    console.log("err", err);
    console.log("res: ", id, key);
  });

  user.on("loggedOn", (args) => {
    console.log("login success", args);

    user.on("loginKey", (key) => {
      res.json({
        code: 200,
        data: {
          loginKey: key
        }
      });
    });

  });

  res.json({
    code: 200
  })

});


module.exports = router
