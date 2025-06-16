import registeredUsers from "../model/registeredUsers.model.js";
import bcrypt from 'bcrypt';

export const registerUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const newUser = new registeredUsers({ name, email, password: hash_password })
        await newUser.save();
        return res.status(201).json({ message: 'User Registered Successfully' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server's internal error!", error: err })
    }
}