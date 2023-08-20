const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000

app.use(cors())
app.use(express.json());//it is been used as a middle ware to hit the request in the thunder
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/api/v1/login', (req,res)=>{
//     res.send('Hello world')
// })

// app.get('/api/v1/signup'  , (req,res)=>{
//     res.send('Hello world')
// })

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})
