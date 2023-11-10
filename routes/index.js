const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"Express home endpoint work"});
})

module.exports = router;