const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserController");

//User routes
router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.registerUser);
router.put("/users/:userId", UserController.updateUser);
router.delete("/users/:userId", UserController.deleteUser);
router.get("/users/:userId", UserController.getUserById);

module.exports = router;