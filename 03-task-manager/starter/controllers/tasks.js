const getTasks = (req, res) => {
  res.send("All items were gotten!");
};

const getSingleTask = (req, res) => {
  res.send(`Single task with id: ${req.params.id} gotten.`);
};

const createTask = (req, res) => {
  console.log(req.body);
  res.json(req.body);
  //   res.send(`Task created using id: ${req.body.id}`);
};

const updateTask = (req, res) => {
  res.send(`Task updated using id: ${req.params.id}`);
};

const deleteTask = (req, res) => {
  res.send(`Task deleted using id: ${req.params.id}`);
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
