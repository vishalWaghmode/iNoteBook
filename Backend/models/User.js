const mongoose = require('mongoose');
const {Schema} = mongoose;//defining the schema

//this is the schema which we have been made downside
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },  
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    } 
});
const Users = mongoose.model('user', UserSchema);
Users.createIndexes();
module.exports = Users