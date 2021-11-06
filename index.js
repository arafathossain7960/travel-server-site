const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
const app =express();


// meddle ware
app.use(cors());
app.use(express.json());



// connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6i98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// travelPackage
async function run(){
    try{
        await client.connect();
        const allPackages= client.db('dream_holidays').collection('travelPackage');
        const orderData= client.db('dream_holidays').collection('orderData');
    const clientFeedback = client.db('dream_holidays').collection('clientFeedback');
    const myOrders = client.db('dream_holidays').collection('myOrders');
        

        
        // homePackages GET API 
        app.get('/homepackage', async(req, res)=>{
            const result  = await allPackages.find({}).toArray();
            res.send(result)
        });

        // packageDetails GET API
        app.get('/packageDetails/:id', async(req, res)=>{
            const id=req.params.id;
            const result  = await allPackages.findOne({_id:ObjectId(id)});
           
            res.json(result)
        });

        // order confirm data POST API 
        app.post('/packageDetails/:id', async(req, res)=>{
            const result  = await orderData.insertOne(req.body);
           
            res.json(result)
        });
            // client feedback data GET API
            app.get('/feedback', async(req, res)=>{

                const result = await clientFeedback.find({}).toArray();
                res.json(result)
            })
           
          // Add new package POS API
         app.post('/addNew',async(req, res)=>{
            
            const result  = await allPackages.insertOne(req.body);
             res.send(result)
         })  

         // order data GET API
         app.get('/order', async(req, res)=>{
            
            const result  = await orderData.find({}).toArray();
            res.json(result)
        });

        // Order DELETE API
        app.delete('/deleteOrder/:id', async(req, res)=>{
            const id= req.params.id;
            const result = await orderData.deleteOne({_id:ObjectId(id)});
            res.json(result)
            
        });
        // my order delete
        app.delete('/myorders/:id', async(req, res)=>{
            const id= req.params.id;
            const result = await orderData.deleteOne({_id:ObjectId(id)});
            res.json(result)
            
        });
        // my orders 
        app.get('/myorders/:email', async(req, res)=>{
            const email= req.params.email;
            const result  = await orderData.find({email:email}).toArray();
           res.json(result);
        })


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