const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const fetch = require("node-fetch")

const productRoutes = require("./API/routes/products")
const orderRoutes = require("./API/routes/orders")




/* const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://new-user-31:new-user-31@node-rest-shop.qkgco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */

 mongoose.connect("mongodb://localhost:27017/company",{useMongoClient:true}) 
 mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // @@
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT , POST , PATCH , DELETE , GET");
    return res.status(200).json({});
  }
  console.log(req.originalUrl);
  next();
});

// Routes which should handle requests

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
