const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminModel");

const decodeToken = (req) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];

        //Verify token
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        
        //Check if admin exists
        const admin = Admin.findById(id);
        if(!admin) return false;
        else return admin;

    } catch (error) {
        return false;
    }

};

module.exports = { decodeToken };