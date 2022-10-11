const express = require("express");
const mongoose = require("mongoose");
const app = express();
const URI = "mongodb://localhost:27017/guessGame_app";
const connectDB = async () => {
  await mongoose.connect(
    URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    },
    (err) => {
      if (err) {
        console.log("error");
      } else {
        console.log("Connected");
      }
    }
  );
};
module.exports = connectDB;
// const schoolSchema = new mongoose.Schema({
//   name: String,
//   Address: String,
//   Date: Number,
// });
// const School = mongoose.model("School", schoolSchema);
// School.create({
//   name: "Model School",
//   Address: "Ikorodu",
//   Date: 2020,
// });
// const data = async () => {
//   const result = await School.insertMany([
//     { name: "Alwaqt School", Address: "Ikorodu", Date: 2012 },
//     { name: "Demonstration Seconday School", Address: "Zaria", Date: 2001 },
//   ]);
//   console.log(result);
// };
// data();
// app.get("/", (req, res) => {
//   res.send("Welcome");
// });
// app.listen(3000, () => {
//   console.log("Server on port 3000 !!!");
// });
