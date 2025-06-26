import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can not insert the data because name is empty!"],
  },
  email: {
    type: String,
    required: [true, "Can not insert the data because email is empty!"],
  },
  password: {
    type: String,
    required: [true, "Can not insert the data because password is empty!"],
  },
  userName: { type: String },
  profilePicture: {
    type: Object,
  },
});

const users = mongoose.model("users", userSchema);

export default users;
