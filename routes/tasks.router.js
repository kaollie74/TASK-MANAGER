const express = require("express");
const tasksRouter = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");

// Method # 1 of setup routes to controllers
// tasksRouter.get("/", getAllTasks);
// tasksRouter.post("/", createTask)
// tasksRouter.get("/:id", getTask);
// tasksRouter.patch("/:id", updateTask);
// tasksRouter.delete("/:id", deleteTask);

//Method #2 of setuping of routes to Controllers
tasksRouter.route("/").get(getAllTasks).post(createTask);
tasksRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

// router.route("/").get((req, res) => {
//   return res.send("all items");
// });

module.exports = tasksRouter;
