const {Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt =require("bcryptjs");

const userSchema = Schema({
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        avatarURL: {
         type: String,
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        },
      },{versionKey:false, timestamps:true})

      const User = model("user",userSchema);

      const userJoiSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
      })

      userSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password,this.password)
      }

module.exports = {
    User,
    userJoiSchema,
    userSchema
  }