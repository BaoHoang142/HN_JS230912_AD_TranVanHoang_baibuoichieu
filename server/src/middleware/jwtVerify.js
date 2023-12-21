const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token have timeout" });
        } else {
          return res.status(403).json({ message: "Token dont match" });
        }
      }
      if (data.role != 1) {
        return res.status(403).json({ message: "You dont have permission" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyToken };
