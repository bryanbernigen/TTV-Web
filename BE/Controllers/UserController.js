const User = require("../Models/UserModel");
const { decodeToken } = require("./utils");

const getAllUsers = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const registerUser = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { name, email, age, address } = req.body;

    const newUser = new User({
        name,
        email,
        age,
        address,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateUser = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { userId } = req.params;

    const { name, email, age, address } = req.body;

    try {
        //Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                age,
                address,
            },
            {
                new: true,
            }
        );

        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteUser = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { userId } = req.params;

    try {
        //Delete user
        const deletedUser = await User.findByIdAndDelete(userId);

        //TODO:Delete all TTV records of the user

        res.status(201).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getUserById = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }
    
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
};
