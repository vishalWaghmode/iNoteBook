const mongoose = require('mongoose');
const {Schema} = mongoose;

//this is the schema which we have been made downside
const NotesSchema = new Schema({
   //it is been used to associate the user with the ntes
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },  
    date: {
        type: Date, 
        default: Date.now
    } 
});

module.exports = mongoose.model('notes', NotesSchema);