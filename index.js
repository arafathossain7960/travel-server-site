const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app =express();


// meddle ware
app.use(cors());
app.use(express.json());

// user :: dream_holidays
// pass :: cBSQGGnbyRp5HzTm

// connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6i98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// travelPackage
async function run(){
    try{
        await client.connect();
        const dream_holidays= client.db('dream_holidays').collection('travelPackage');
        const myDocTest = {name:'Air show', area:'bangladesh'}

        const result = dream_holidays.insertOne(myDocTest);
    }
    finally{
    //  await client.close();
    }

}
run().catch(console.dir)






// testing or initial GET API 
app.get('/', (req, res)=>{
    res.send('please! check the server')
})


// server listener
app.listen(port, ()=>{
    console.log(`the server is running on ${port}`)
})