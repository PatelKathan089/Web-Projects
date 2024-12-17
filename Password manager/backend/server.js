import e from "express";
import cors from "cors";
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";

// Connecting to MongoDb client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
await client.connect();
console.log('Connected successfully')

// Creating Database Name & Express app
const dbName = 'Password_Manager';
const app = e();
const port = 3000;

// Middleware for body-parser and cors:-
app.use(bodyParser.json())
app.use(cors())


// Api - Read all the passwords:-
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');

    try {
        const findResult = await collection.find({}).toArray();
        res.json(findResult)
    } catch (err) {
        console.error(err)
        res.status(500).send({ sucesss: false, message: "Failed to send passwords" })
    }
})

// Api - Create all the passwords:-
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');

    try {
        const insertResult = await collection.insertOne(password);
        res.send({ sucesss: true, result: insertResult })
    } catch (err) {
        console.error(err)
        res.status(500).send({ success: false, message: "Failed to add a password" })
    }
})

// Api - Delete a password by id:-
app.delete('/', async (req, res) => {
    const id = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');

    try {
        const deletedResult = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result: deletedResult });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to delete the password" });
    }
})

// Api - Update a password by their id:-
app.put("/", async (req, res) => {
    const { id, site, username, password } = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')

    try {
        const updatedResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { site, username, password } })
        res.send({ sucesss: true, result: updatedResult })
    } catch (err) {
        console.error(err)
        res.status(500).send({ success: false, message: "Failed to update the password" })
    }
})

app.listen(port, () => {
    console.log(`Your server is currently running on http://localhost:${port}`)
})