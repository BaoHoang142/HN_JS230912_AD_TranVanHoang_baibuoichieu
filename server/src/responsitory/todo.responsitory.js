const db = require("../config/db.config");
// select ten_cot from ten_bang
async function addTodos(todoName) {
  const [result] = await db.execute("INSERT INTO todos (todoName) VALUES (?)", [
    todoName,
  ]);
  return result;
}
async function renderTodo() {
  const [result] = await db.execute("SELECT * FROM todos");
  return result;
}

async function deleteTodo(id) {
  const [result] = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  return result;
}
async function updateTodo(todoName, id) {
  const [result] = await db.execute(
    "UPDATE todos SET todoName = ? WHERE id = ?",
    [todoName, id]
  );
  return result;
}
module.exports = {
  addTodos,
  renderTodo,
  deleteTodo,
  updateTodo,
};
