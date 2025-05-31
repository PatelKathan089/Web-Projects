import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config'
import productRoutes from './routes/product.routes.js';
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";

const port = 3000;
const app = express();

// middleware for appliction:-
app.use(express.json());
app.use(cors());

// Connecting my server to mongoDB:-
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('open', () => {
    console.log('Your connection with database is successful!')
})

db.on('error', () => {
    console.log('Your connection with database is not successful!')
})

// Calling all routes:-
productRoutes(app);
cartRoutes(app);
userRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})