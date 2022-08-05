const express = require("express");
const todolistController = require("../controllers/todolist.controller");
const router = express.Router();

router.get("/", todolistController.getAllData);
router.post("/", todolistController.saveTodo);
router.patch("/:id", todolistController.updateTodo);
router.delete("/:id", todolistController.deleteTodo);

module.exports = router;
