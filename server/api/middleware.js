const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = await req.headers;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireToken
}
