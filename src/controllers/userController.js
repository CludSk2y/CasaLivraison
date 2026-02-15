const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  validateRegister,
  validateLogin,
} = require("../validations/userValidation");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) return res.status(400).json({ errors });

    const { fullName, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { errors, isValid } = validateLogin(req.body || {});
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
