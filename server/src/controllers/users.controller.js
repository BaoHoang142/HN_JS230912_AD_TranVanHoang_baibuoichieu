const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../responsitory/user.responsitory");
require("dotenv").config();
async function login(req, res) {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);
  if (!result) {
    return res.status(404).json({
      message: "This account does not exist",
    });
  }
  if (result.password != password) {
    return res.status(400).json({
      message: "Password is not correct",
    });
  } else {
    const token = jwt.sign(
      { id: result.id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    return res.status(200).json({
      message: "Login successfully",
      token,
    });
  }
}
module.exports = {
  login,
};
