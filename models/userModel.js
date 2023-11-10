const mongoose = require("mongoose");
const Joi = require("joi");

let userSchema = new mongoose.Schema({
userName :String,
password:String,
email:String,
city:String,
phoneNumber:String,
role : {
    type : String,
    default: "user"
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