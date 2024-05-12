import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// Func to add a new Task
export const newTask = async (req, res, next) => {
  try {
    // Take this data from body
    const { title, description } = req.body;

    // Adding new task to database named as "Task"
    await Task.create({ title, description, user: req.user });

    // Sending response
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Func to get all tasks of a single user
export const getMyTasks = async (req, res, next) => {
  try {
    // First access the id from user if he is logged in
    const userId = req.user._id;

    // Now store the tasks of that particular user using his id
    const tasks = await Task.find({ user: userId });

    // Now display the task array
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Func to update a task
export const updateTask = async (req, res, next) => {
  try {
    //  First access the id from params and find that particular task
    const task = await Task.findById(req.params.id);

    // If task is not present then throw this error
    if (!task) return next(new Error("Task not found!", 404));

    //If task is present then update the task from below method
    task.isCompleted = !task.isCompleted;

    // Now save the updated task
    await task.save();

    // Send the response message
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Func to delete a task
export const deleteTask = async (req, res, next) => {
  try {
    //  First access the id from params and find that particular task
    const task = await Task.findById(req.params.id);

    // If task is not present then throw this error
    if (!task) return next(new ErrorHandler("Task not found!", 404));

    // If task is present then directly delete the task using this method
    await task.deleteOne();

    // Send the response message
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
