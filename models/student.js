const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
      },
    password: {
      type: String,
      required: true
    }
  }, {timestamps: true });
  
  studentSchema.methods.generateAuthToken = async () => {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, 'kelvinklin1');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
  };

  module.exports = mongoose.model("Student", studentSchema);