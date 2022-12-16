const express = require("express");
const router = express.Router();


router.post("/", (_, res) => {
  res.json({
    code: 200
  })
});


module.exports = router
