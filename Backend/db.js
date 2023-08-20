const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://vishalwaghmode33284:vishal@cluster1.hcsn9l8.mongodb.net/iNotebook"

const connectToMongo = () =>{
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully.");
    })
}

module.exports = connectToMongo;