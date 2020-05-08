const http = require('http');
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose")
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');
const port = process.env.PORT || 3000


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
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err));
