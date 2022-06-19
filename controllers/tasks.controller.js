const TaskModel = require("../models/task.model");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom.error");

const getAllTasks = asyncWrapper(
  async (req, res) => {
    const tasks = await TaskModel.find({});
    return res.status(201).send({ tasks });
    // res.status(400).send(error);
  } // end getAllTasks
); // end asyncWrapper

const createTask = asyncWrapper(
  async (req, res) => {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
    // const errorMsg =
    //   error.errors.name.message || "Unable to complete request";
    // res.status(400).send({ msg: errorMsg });
  } // end createTask
); // end asyncWrapper

const getTask = asyncWrapper(
  async (req, res, next) => {
    const task = await TaskModel.findOne({ _id: req.params.id });
    const response = !task
      ? next(createCustomError(`No task with id: ${req.params.id}`, 404))
      : res.status(200).send({ task });
    return response;

    // res.status(400).send({ error });
  } // end getTask
);

const updateTask = asyncWrapper(
  async (req, res, next) => {
    const { id: taskID } = req.params;

    /**
     * @Param_1 find by the "_id"
     * @Param_2 values that you are updating
     * @Param_3 options where we will return new updated value and run it
     * against the validator set in the Schema
     */
    const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    const response = !task
    ? next(createCustomError(`No task with id: ${req.params.id}`, 404))
    : res.status(200).send({ task });
  return response;

    // res.status(500).send(error);
  } // end getTask
); // end asyncWrapper

const deleteTask = asyncWrapper(
  async (req, res, next) => {
    const { id: taskId } = req.params;
    const task = await TaskModel.findOneAndDelete({ _id: taskId });

    const response = !task
      ? next(createCustomError(`No task with id: ${req.params.id}`, 404))
      : res.status(200).send({ task });
    return response;
  } // end deleteTask
);

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
