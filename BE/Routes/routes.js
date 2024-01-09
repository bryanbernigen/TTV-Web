const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserController");
const AdminController = require("../Controllers/AdminController");

//User routes
router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.registerUser);
router.put("/users/:userId", UserController.updateUser);
router.delete("/users/:userId", UserController.deleteUser);
router.get("/users/:userId", UserController.getUserById);

//Admin routes
router.post("/admin/login", AdminController.loginAdmin);
router.post("/admin/register", AdminController.registerAdmin);

module.exports = router;