const express = require("express");
const { UserModel, validateUser, validLogin, getToken } = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");

router.get("/", async(req,res) => {
  try{
    let data = await UserModel.find({}).limit(20);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id", async(req,res) => {
  try{
    const id = req.params.id
    let data = await UserModel.findOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  let validBody = validateUser(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // user.password = "*****";
    res.json(user)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.post("/login", async(req,res) => {
  let validBody = validLogin(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({email: req.body.email});
    
    if(!user){
      return res.json({msg:"Email or password not good"})
    }

    let userPass = await bcrypt.compare(req.body.password, user.password)

    if(!userPass){
      return res.json({msg:"Email or password not good"})
    }
    let token = getToken(user._id);

    return res.json({token: token})
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.get("/userInfo",auth, async(req,res) => {
  let user = await UserModel.find({_id:req.tokenData._id},{password:0})
  res.json(user);
})


router.put("/:id", async(req,res) => {
  let validBody = validateUser(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
   let id = req.params.id;
   let data = await UserModel.updateOne({_id:id},req.body);
  res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.delete("/:id", async(req,res) => {
  try {
    let id = req.params.id;
    let data = await UserModel.deleteOne({_id:id} );
    res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

module.exports = router;