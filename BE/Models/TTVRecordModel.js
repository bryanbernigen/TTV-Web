const mongoose = require("mongoose");
const { Types } = mongoose;

const ttvRecordSchema = new mongoose.Schema({
    adminId: {
        type: Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    bloodPressureSystolic: {
        type: number,
        required: true,
    },
    bloodPressureDiastolic: {
        type: number,
        required: true,
    },
    pulse: {
        type: number,
        required: true,
    },
    breathingRate: {
        type: number,
        required: true,
    },
    temperature: {
        type: number,
        required: true,
    },
});

const TTVRecord = mongoose.model("TTVRecord", ttvRecordSchema);

module.exports = TTVRecord;
