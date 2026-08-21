const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { loginSchema, registerSchema } = require('../lib/validation');

function createSession(user) {
  // A one-day token keeps the demo convenient while limiting the lifetime of a stolen token.
  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt
    }
  };
}

async function login(req, res, next) {
  try {
    const credentials = loginSchema.parse(req.body);
    const user = await User.findOne({ email: credentials.email.toLowerCase() });

    if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) {
      const error = new Error('Invalid email or password.');
      error.status = 401;
      throw error;
    }

    return res.json(createSession(user));
  } catch (error) {
    return next(error);
  }
}

async function register(req, res, next) {
  try {
    const credentials = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(credentials.password, 10);
    const user = await User.create({
      email: credentials.email.toLowerCase(),
      passwordHash
    });

    return res.status(201).json(createSession(user));
  } catch (error) {
    return next(error);
  }
}

module.exports = { login, register };
