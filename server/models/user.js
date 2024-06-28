//const mongoose = require('mongoose');
//
//const userSchema = mongoose.Schema({
//   name: {
//        type: String,
//        required: true,
//   },
//   email: {
//        type: String,
//        required: true,
//   },
//   profilePic: {
//        type: String,
//        required: true,
//   },
//});
//
//const User = mongoose.model('User', userSchema);
//module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true,
   },
   email: {
        type: String,
        required: true,
        unique: true,
   },
   profilePic: {
        type: String,
        required: true,
   },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
