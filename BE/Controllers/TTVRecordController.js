const TTVRecord = require("../Models/TTVRecordModel");
const { decodeToken } = require("./utils");


const addRecord = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }


    const {
        adminId,
        userId,
        date,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        pulse,
        breathingRate,
        temperature,
    } = req.body;

    //Check if date is valid, else use current date
    const recordDate = date ? date : Date.now();

    const newRecord = new TTVRecord({
        adminId,
        userId,
        date: recordDate,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        pulse,
        breathingRate,
        temperature,
    });

    try {
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getAllRecords = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    try {
        const records = await TTVRecord.find().sort({ date: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getRecordById = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { id } = req.params;

    try {
        const record = await TTVRecord.findById(id);
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateRecord = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { id } = req.params;
    const {
        adminId,
        userId,
        date,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        pulse,
        breathingRate,
        temperature,
    } = req.body;

    //Check if date is valid, else use current date
    const recordDate = date ? date : Date.now();

    const updatedRecord = {
        adminId,
        userId,
        date: recordDate,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        pulse,
        breathingRate,
        temperature,
    };

    try {
        const savedRecord = await TTVRecord.findByIdAndUpdate(
            id,
            updatedRecord,
            {
                new: true,
            }
        );
        res.status(200).json(savedRecord);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteRecord = async (req, res) => {
    if (!decodeToken(req)) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { id } = req.params;

    try {
        const deletedRecord = await TTVRecord.findByIdAndDelete(id);
        res.status(200).json(deletedRecord);
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    addRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
};
