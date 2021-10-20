const { TaskModel } = require("../models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");

const getTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOne({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with _id ${taskID}` });
  }

  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with _id ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with _id ${taskID}` });
  }
  //Opciones de respuesta
  // res.status(200).json({task})
  // res.status(200).send()
  res.status(200).json({ task: null, status: "Success" });
});

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
