const authRoutes = require("./routes/auth");
const mongoose = require("mongoose")
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authRoutes);



mongoose
  .connect(
    "mongodb+srv://kelvinklin:Itskelvin1@cluster0-xcd4t.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));