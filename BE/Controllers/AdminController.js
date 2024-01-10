const Admin = require("../Models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
    });

    try {
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        } else {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

            res.status(200).json({
                token,
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const getNumberOfAdmins = async (req, res) => {
    try {
        const admins = await Admin.countDocuments();
        res.status(200).json(admins);
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = { registerAdmin, loginAdmin, getNumberOfAdmins };
