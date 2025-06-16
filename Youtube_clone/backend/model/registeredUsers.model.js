import mongoose from "mongoose";

const RegisteredUsersSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Can not insert the data because name is empty!'] },
    email: { type: String, required: [true, 'Can not insert the data because email is empty!'] },
    password: { type: String, required: [true, 'Can not insert the data because password is empty!'] }
})

const registeredUsers = mongoose.model('registeredUsers', RegisteredUsersSchema);

export default registeredUsers;