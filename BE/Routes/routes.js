const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserController");
const AdminController = require("../Controllers/AdminController");
const TTVRecordController = require("../Controllers/TTVRecordController");

//User routes
router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.registerUser);
router.put("/users/:userId", UserController.updateUser);
router.delete("/users/:userId", UserController.deleteUser);
router.get("/users/:userId", UserController.getUserById);
router.get("/users/email/:email", UserController.getUserByEmail);
router.get("/usercount", UserController.getNumberOfUsers);

//Admin routes
router.post("/admin/login", AdminController.loginAdmin);
router.post("/admin/register", AdminController.registerAdmin);
router.get("/admincount", AdminController.getNumberOfAdmins);

//TTVRecord routes
router.get("/records", TTVRecordController.getAllRecords);
router.post("/records", TTVRecordController.addRecord);
router.get("/records/:id", TTVRecordController.getRecordById);
router.put("/records/:id", TTVRecordController.updateRecord);
router.delete("/records/:id", TTVRecordController.deleteRecord);
router.get("/recordcount", TTVRecordController.getNumberOfRecords);

module.exports = router;