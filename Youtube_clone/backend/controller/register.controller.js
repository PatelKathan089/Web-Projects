import users from "../model/users.model.js";
import bcrypt from "bcrypt";

export const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userName =
      name.split(" ")[0] + Math.floor(Math.random() * 9000 + 1000);

    const hash_password = await bcrypt.hash(password, 10);

    const nameLogo =
      `${name.split(" ")[0].slice(0, 1)}` + `${name.split(" ")[1].slice(0, 1)}`;

    // Create profilePicture object
    let profilePicture;
    if (req.file) {
      profilePicture = {
        url: `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        contentType: req.file.mimetype,
      };
    } else {
      profilePicture = {
        url: `https://ui-avatars.com/api/?name=${nameLogo}&background=random&color=fff&rounded=true`,
        contentType: "external",
      };
    }

    const newUser = new users({
      name,
      email,
      password: hash_password,
      userName,
      profilePicture,
    });

    await newUser.save();
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server's internal error!", error: err });
  }
};
