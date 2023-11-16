const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
userName :String,
password:String,
email:String,
city:String,
phoneNumber:String,
role : {
    type : String,
    default: "user"
  },
  date_created:{
    type:Date , default:Date.now
    }
})
exports.UserModel = mongoose.model("users",userSchema)

exports.validateUser = (_reqBody) => {
let joiSchema = Joi.object({
userName :Joi.string().min(2).max(400).required(),
password:Joi.string().min(2).max(400).required(),
email:Joi.string().min(2).max(400).email().required(),
city:Joi.string().min(2).max(400).required(),
phoneNumber:Joi.string().min(2).max(400).required(),
role:Joi.string().min(2).max(400).allow(),
})
return joiSchema.validate(_reqBody)
}

exports.getToken = (_userId) => { 
  let token = jwt.sign({_id: _userId}, "dioKababayan", {expiresIn: "60mins"});
return token;
  
}


exports.validLogin = (_reqBody) => {
let joiSchema = Joi.object({
password:Joi.string().min(2).max(400).required(),
email:Joi.string().min(2).max(400).email().required(),
})
return joiSchema.validate(_reqBody)
}