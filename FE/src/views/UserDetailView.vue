<script setup>
import Table from "@/components/Table.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.userId;

const deleteUser = () => {
    console.log("deleteUser");
};

const editUser = () => {
    console.log("editUser");
};

const addUser = () => {
    console.log("addUser");
};

const recordData = [];
const headers = [
    "Date",
    "Admin ID",
    "Blood Pressure Systole",
    "Blood Pressure Diastole",
    "Pulse",
    "Breathing Rate",
    "Temperature",
];
const properties = [
    "date",
    "adminId",
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
    colorRangeBloodPressureSystolic,
    colorRangeBloodPressureDiastolic,
    colorRangePulse,
    colorRangeBreathingRate,
    colorRangeTemperature,
];


</script>

<template>
    <div class="record-container">
        <div class="left-container">
            <h1>User Data</h1>
            <br />
            <form>
                <div class="mb-5">
                    <label for="userEmail" class="form-label"
                        >Email address</label
                    >
                    <input
                        type="email"
                        class="form-control"
                        id="userEmail"
                        @keyup.enter="searchUser"
                        @blur="searchUser"
                    />
                </div>
                <div class="mb-5">
                    <label for="userName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="userName" />
                </div>
                <div class="mb-5">
                    <label for="userAge" class="form-label">Age</label>
                    <input type="number" class="form-control" id="userAge" />
                </div>
                <div class="mb-5">
                    <label for="userAddress" class="form-label">Address</label>
                    <textarea
                        class="form-control"
                        id="userAddress"
                        rows="6"
                    ></textarea>
                </div>
            </form>
            <button
                v-if="userId == null"
                type="button"
                class="btn btn-success"
                @click="addUser()"
            >
                Add User
            </button>
            <div v-else class="multi-button-container">
                <button
                    id="existingUserButton"
                    type="button"
                    class="btn btn-success"
                    @click="editUser(true)"
                >
                    Edit User
                </button>
                <button
                    id="newUserButton"
                    type="button"
                    class="btn btn-danger"
                    @click="deleteUser(false)"
                >
                    Delete User
                </button>
            </div>
        </div>
        <div class="right-container">
            <h1>User records</h1>
            <Table
            :datas="recordData"
            :headers="headers"
            :properties="properties"
            :colorRanges="colorRanges"
            actionBasePath="/records/edit/"
        />
        </div>
    </div>
</template>

<style scoped>
.record-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.left-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    height: 100%;
}

.right-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 100%;
    padding-right: 1vw;
}

.mb-5 {
    width: 100%;
    margin-bottom: 2vh;
}

.form-control {
    width: 20vw;
}

.multi-button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2vw;
}
</style>
