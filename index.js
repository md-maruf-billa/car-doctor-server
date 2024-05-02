import express from 'express';
import cors from 'cors'
import 'dotenv/config'
const app = express();
import { MongoClient, ServerApiVersion } from 'mongodb'
const port = process.env.PORT || 7000;


//--------------Middleware-----------
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fp7vkua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const servicesCollection = client.db("car-doctor").collection("services");
        // -------------------Get All Data from Database and send Client side--------------
        app.get("/services", async(req,res) =>{
            const result = await servicesCollection.find().toArray();
            res.send(result);

    })
        
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("I am running in port 7000")
})