const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Tutors = require("../models/tutor");
//const Subjects = require("../models/subjects");


exports.signUpt = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    const subjects = req.body.subjects;

    if(!name || !email ||!password ||!isAdmin ||!subjects) {
       res.status(400).send({
          status: false,
          message: "All fields are required"
  })
   return;
  }
  Tutors.findOne({ email })
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
        let user = new Tutors({
          name,
          email,
          password,
        });
        return user.save();
      })
      .then(() => res.status(200).send({ status: true, message: "Tutor registration was successful, Welcome Onboard Kelvins Tutor app.", name: name, }))
      .catch(err => console.log(err));
      //res.json({message: "Welcome Onboard Kelvins Tutor app", name: name,});
  };

  exports.logint = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        Tutors.findOne({ email })
         .then(user => {
            if (!user) {
            return res
            .status(404)
            .send("Tutor not found, please provide valid credentials");
            }
    bcrypt.compare(password, user.password).then(valid => {
            if (!valid) {
            return res
            .status(403)
            .send(
                "Incorrect login details, Please review and try again"
            );
            }
        const token = jwt.sign({ email: user.email, _id: user._id },"kelvinklin",{ expiresIn: "1hr" }
            );
            res.status(200).send({_id: user._id,name: user.name,token});
            });
            })
            .catch(err => console.log(err));
    }


    


    