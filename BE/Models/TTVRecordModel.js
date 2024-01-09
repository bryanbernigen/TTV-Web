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
        type: Number,
        required: true,
    },
    bloodPressureDiastolic: {
        type: Number,
        required: true,
    },
    pulse: {
        type: Number,
        required: true,
    },
    breathingRate: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
});

const TTVRecord = mongoose.model("TTVRecord", ttvRecordSchema);

module.exports = TTVRecord;
