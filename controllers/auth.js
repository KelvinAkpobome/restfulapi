const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Student = require("../models/student");

exports.signUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if(!name || !email ||!password) {
       res.status(400).send({
          status: false,
          message: "All fields are required"
  })
   return;
  }
  Student.findOne({ email })
      .then(user => {
        if (user) {
          return res
            .status(423)
            .send({status: false, message: "This email already exists"});
        }
      })
    bcrypt
      .hash(password, 12)
      .then(password => {
        let user = new Student({
          name,
          email,
          password,
        });
        return user.save();
      })
      .then(() => res.status(200).send({ status: true, message: "Student registration was successful, Welcome Onboard Kelvins Tutor app", name: name, }))
      .catch(err => console.log(err));
      //res.json({message: "Welcome Onboard Kelvins Tutor app", name: name,});
  };

  exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Student.findOne({ email })
     .then(user => {
        if (!user) {
        return res
        .status(404)
        .send("Student not found, please provide valid credentials");
        }
bcrypt.compare(password, user.password).then(valid => {
        if (!valid) {
        return res
        .status(403)
        .send(
            "Incorrect login details, Please review and try again"
        );
        }
    const token = jwt.sign({ email: user.email, _id: user._id },"kelvinklin1",{ expiresIn: "1hr" }
        );
        res.status(200).send({_id: user._id, name: user.name,token});
        });
        })
        .catch(err => console.log(err));
}