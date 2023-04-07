const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('server running...');
});

app.use(cors());
app.use(express.json());

//iCFmmhPjFdUk2hvV
//meraj154213



const uri = "mongodb+srv://meraj154213:iCFmmhPjFdUk2hvV@cluster0.hj5abn5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const dataCollection = client.db("smartAgri").collection("readings");
        // create a document to insert
        // const reading = {
        //     n: "350",
        //     p: "350",
        //     k: "350",
        //     date: "27/3/23"
        // }
        // const result = await dataCollection.insertOne(reading);
        // console.log(result);

        app.get('/readings' ,async(req,res)=>{
            const cursor = dataCollection.find({});
            const readings = await cursor.toArray();
            res.send(readings); 
        })

        app.get('/readings/:id' , async (req,res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id)};
            const reading = await dataCollection.findOne(query);
            res.send(reading);
        })
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`server running on ${port}`);
})