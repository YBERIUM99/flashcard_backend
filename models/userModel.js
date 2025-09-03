const mongoose = require("mongoose");

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

    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },

    department: {
        type: String,
        required: false
    },



   level: {
        type: String,
        default: "Beginner",
        required: false,
   },

})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel