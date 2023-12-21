const {
    addTodos,
    deleteTodo,
    renderTodo,
    updateTodo,
  } = require("../responsitory/todo.responsitory");
  
  async function addTodo(req, res) {
    const { todoName } = req.body;
    await addTodos(todoName);
    res.status(201).json({
      message: "Complete Add",
    });
  }
  async function render(req, res) {
    const result = await renderTodo();
    res.status(200).json(result);
  }
  async function removeTodo(req, res) {
    const { id } = req.params;
    await deleteTodo(id);
    const result = await renderTodo();
    res.status(200).json(result);
  }
  async function updateTodo1(req, res) {
    const { id } = req.params;
    const { todoName } = req.body;
    const result = await updateTodo(todoName, id);
    res.status(200).json(result);
  }
  module.exports = {
    addTodo,
    render,
    removeTodo,
    updateTodo1,
  };
  