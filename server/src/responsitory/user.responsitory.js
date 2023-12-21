const db = require("../config/db.config");
const jwt = require("jsonwebtoken");

async function getUserByEmail(email) {
  try {
    const [findUser] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return findUser[0];
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getUserByEmail,
};
