<script setup>
import Table from "@/components/Table.vue";
import axios from "axios";

const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/records");
    return res.data;
};
const data = await fetchData();
const headers = [
    "Date",
    "Admin ID",
    "User ID",
    "Blood Pressure Systole",
    "Blood Pressure Diastole",
    "Pulse",
    "Breathing Rate",
    "Temperature",
];
const properties = [
    "date",
    "adminId",
    "userId",
    "bloodPressureSystolic",
    "bloodPressureDiastolic",
    "pulse",
    "breathingRate",
    "temperature",
];
const colorRangeBloodPressureSystolic = {
    interval: 10,
    goodUpperBound: 120,
    goodLowerBound: 60,
    useColor: true,
};
const colorRangeBloodPressureDiastolic = {
    interval: 10,
    goodUpperBound: 80,
    goodLowerBound: 40,
    useColor: true,
};
const colorRangePulse = {
    interval: 10,
    goodUpperBound: 100,
    goodLowerBound: 60,
    useColor: true,
};
const colorRangeBreathingRate = {
    interval: 10,
    goodUpperBound: 20,
    goodLowerBound: 10,
    useColor: true,
};
const colorRangeTemperature = {
    interval: 0.5,
    goodUpperBound: 37.5,
    goodLowerBound: 36.5,
    useColor: true,
};
const colorRanges = [
    {},
    {},
    {},
    colorRangeBloodPressureSystolic,
    colorRangeBloodPressureDiastolic,
    colorRangePulse,
    colorRangeBreathingRate,
    colorRangeTemperature,
];
</script>

<template>
    <div class="table-header-container">
        <h1>TVV Records</h1>
        <RouterLink to="/records/add" class="btn">
            <button type="button" class="btn btn-success">Add Record</button>
        </RouterLink>
    </div>
    <div class="table-container">
        <Table
            :datas="data"
            :headers="headers"
            :properties="properties"
            :colorRanges="colorRanges"
            actionBasePath="/records/edit/"
        />
    </div>
</template>

<style scoped>
.btn {
    max-height: 5vh;
    align-self: center;
    padding-top: 1vh;
}
.table-header-container {
    display: flex;
    flex-direction: row;
    justify-content: c;
    gap: 0.5vw;
    margin-left: 2vw;
}

.table-container {
    align-items: center;
}
</style>
