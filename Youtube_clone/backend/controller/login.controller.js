import users from "../model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email:-
    const regi_user = await users.findOne({ email: email });
    // This will give me a boolean value like true or false , if my password matches or not with the registered_user password:-
    const matched_password = await bcrypt.compare(password, regi_user.password);

    if (email === regi_user.email && matched_password) {
      const token = jwt.sign(
        { uId: regi_user._id, userName: regi_user.userName },
        process.env.SECRET_KEY,
        {
          expiresIn: "1hr",
        }
      );

      return res.status(200).json({
        message: "User logIn Successfully.",
        token: token,
        userName: regi_user.userName,
        avatar: regi_user.profilePicture.url,
      });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed to Login", error: err });
  }
};
