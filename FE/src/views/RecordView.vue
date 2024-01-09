<script setup>
import Table from "@/components/Table.vue";
import axios from "axios";

const token = localStorage.getItem("token");
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
};
const colorRangeBloodPressureDiastolic = {
    interval: 10,
    goodUpperBound: 80,
    goodLowerBound: 40,
};
const colorRangePulse = {
    interval: 10,
    goodUpperBound: 100,
    goodLowerBound: 60,
};
const colorRangeBreathingRate = {
    interval: 10,
    goodUpperBound: 20,
    goodLowerBound: 10,
};
const colorRangeTemperature = {
    interval: 1,
    goodUpperBound: 37.5,
    goodLowerBound: 36.5,
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
        />
    </div>
</template>

<style scoped>
.btn{
    max-height: 5vh;
    align-self: center;
}
.table-header-container {
    display: flex;
    flex-direction: row;
    justify-content: c;
    gap: 2vw;
    margin-left: 2vw;
}

.table-container {
    align-items: center;
}
</style>
