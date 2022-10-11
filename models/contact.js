var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var contactSchema = new mongoose.Schema({
  names: String,
  message: String,
});
contactSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Contact", contactSchema);
