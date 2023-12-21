const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const bodyParser = require("body-parser");
const { usersRouter } = require("./src/routers/users.routes");
const { todoRouter } = require("./src/routers/todo.routes");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// su dung router
usersRouter(app);
todoRouter(app);
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} is running`);
});
