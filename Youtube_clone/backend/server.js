import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config'
import { loginRoute } from "./routes/login.routes.js";
import { registerRoute } from "./routes/register.routes.js";

const port = 3000;
const app = express();

// Connecting my server to database:-
mongoose.connect(process.env.MONGO_URI);
// Check if my connection to my database is successful or not:-
mongoose.connection.on('open', () => {
    console.log('Your server is connected to your database successfully.')
})
mongoose.connection.on('error', () => {
    console.log('Your server is not connected to your database!')
})

// Body-Parser middleware for parsing json data of req.body:-
app.use(express.json())

// Cors middleware for resource sharing across different urls:-
app.use(cors())

// Calling All Routes Here..
loginRoute(app);
registerRoute(app);

app.listen(port, () => {
    console.log('Your app server is running on http://localhost/3000');
})