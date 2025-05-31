import Users from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const exisiting_user = await Users.findOne({ email: email });
        if (exisiting_user) {
            return res.status(400).json({ message: "User already exist!" })
        } else {
            const user = new Users({ name, email, password });
            await user.save();
            return res.status(201).json({ message: "User added successfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: `Server's internal error!` });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        } else if (user.password === password) {
            const token = jwt.sign({ uId: user._id, uName: user.name, uEmail: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: "Login Successful", token: token });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server's internal error!", error: err })
    }
};

// verifyToken middleware for api:-
export const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Can't find the jwt token on your api headers!" })
    } else {
        try {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, process.env.SECRET_KEY)
            req.user = user; // atteching user info to req obj
            next() // processed to next route or middleware
        } catch (err) {
            return res.status(403).json({ message: "Invalid JWT Token!" })
        }
    }
}
