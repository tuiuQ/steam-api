import express from "express";
import SteamUser from "steam-user";
import SteamTotp from "steam-totp";

const app = express();
const client = new SteamUser;

const USERNAME = "oagsaxf3";
// const PASSWORD = "nzlm4xsh";
const PASSWORD = "nzlm4xs";

const SHARED_SECRET = "2DEBlBw2IKKIBJK4erlxXS5In5s=";

app.get('/login', (req, res) => {

  client.logOn({
    accountName: USERNAME,
    password: PASSWORD,
  });

  client.on("loggedOn", () => {
    res.json({
      code: 200,
      message: "登录成功" 
    })
  });

  client.on("error", (err) => {
    if (err.message === "InvalidPassword") {
      res.json({
        code: 0,
        message: err.message
      })
    }
    // console.log("err: ", err.name, err.message);
  });

  client.on("steamGuard", (domain, callback) => {

    const code = SteamTotp.generateAuthCode(SHARED_SECRET);
    callback(code);

  });

});

app.listen(3000, () => {
  console.log("Listen Port 3000");
});

