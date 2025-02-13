import e from "express";
import cors from "cors";
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import CryptoJS from "crypto-js";

const app = e();
const port = 3000;

// Key for encryption and decryption of data:-
const key = process.env.SECRET_KEY;

// Cores Option for allowing access to fronted only:-
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "x-api-key"]
};

// Middleware for body-parser and cors:-
app.use(bodyParser.json())
app.use(cors(corsOptions))

// Connecting to MongoDb:-
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
await client.connect();
console.log('Connected successfully')

// Creating Database Name & Collection
const dbName = 'Password_Manager';
const db = client.db(dbName)
const collection = db.collection('passwords');

// Api - Read all the passwords:-
app.get('/', async (req, res) => {
    const apiKey = req.headers['x-api-key']; // Get API key from request header

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ success: false, message: "Access Denied" });
    }

    try {
        const findResult = await collection.find({}).toArray();
        // Decrypt Passwords:- 
        const decrypted_data = findResult.map(({ _id, site, username, password }) => {
            return { _id, site, username, password: CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8) }
        })
        res.json(decrypted_data)
    } catch (err) {
        console.error(err)
        res.send({ sucesss: false, message: "Failed to send passwords" })
    }
})

// Api - Create all the passwords with encryption:-
app.post('/', async (req, res) => {
    const { site, username, password } = req.body

    try {
        // Encrypt Password:-
        const encrypt_password = CryptoJS.AES.encrypt(password, key).toString();
        const insertResult = await collection.insertOne({ site, username, password: encrypt_password });
        res.send({ sucesss: true, result: insertResult })
    } catch (err) {
        console.error(err)
        res.send({ success: false, message: "Failed to add a password" })
    }
})

// Api - Delete a password by id:-
app.delete('/', async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ success: false, message: "ID is required" });

    try {
        const deletedResult = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result: deletedResult });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Failed to delete the password" });
    }
})

// Api - Update a password by their id:-
app.put("/", async (req, res) => {
    const { id, site, username, password } = req.body

    try {
        const encrypt_password = CryptoJS.AES.encrypt(password, key).toString();
        const updatedResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { site, username, password: encrypt_password } })
        res.send({ sucesss: true, result: updatedResult })
    } catch (err) {
        console.error(err)
        res.send({ success: false, message: "Failed to update the password" })
    }
})

app.listen(port, () => {
    console.log(`Your server is currently running on http://localhost:${port}`)
})