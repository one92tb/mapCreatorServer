const jwt = require('jsonwebtoken');
require('dotenv').config();

let user;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userData } = jwt.verify(token, process.env.SECRET_KEY);
    user = userData;
  } catch (error) {
    return res.status(400).json({
      message: 'invalid token'
    });
  }

  const { isAdmin } = user;
  if (isAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
