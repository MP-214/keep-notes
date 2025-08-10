const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "I_LOVE_MY_CODE";

const handleSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ email, userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
module.exports = { handleSignUp, handleLogin };
