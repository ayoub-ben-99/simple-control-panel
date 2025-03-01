const express = require("express");
const User = require("../models/userSchema");

const router = express.Router();
// (Create)
router.post("/add", async (req, res) => {
  const data = req.body;

  try {
    const newUser = new User(data);
    await newUser.save();
    res.json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});

// (Read)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// get user by id
router.get("/view/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "user is not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "error server" });
  }
});

// (Update)
router.put("/update/:id", async (req, res) => {
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// (Delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
