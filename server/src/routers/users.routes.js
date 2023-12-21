const { login } = require("../controllers/users.controller");

const usersRouter = (app) => {
  app.post("/auth/login", login);
};
module.exports = {
  usersRouter,
};
