<script setup>
import Table from "@/components/Table.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const userId = route.params.userId;
const isDataLoaded = ref(false);
const vUser = ref({
    _id: "",
    email: "",
    name: "",
    age: "",
    address: "",
    ttvRecords: [],
});

const createUser = () => {
    const userEmail = vUser.value.email;
    const userName = vUser.value.name;
    const userAge = vUser.value.age;
    const userAddress = vUser.value.address;

    if (!userEmail.includes("@")) {
        alert("Please enter a valid email");
        return;
    }

    if (!userEmail || !userName) {
        alert("Please enter an email address and name!");
        return null;
    }

    const newUser = {
        email: userEmail,
        name: userName,
        age: userAge,
        address: userAddress,
    };

    return newUser;
};

const deleteUser = () => {
    const res = prompt(
        "Are you sure you want to delete this user? enter 'yes' to confirm"
    );
    if (res === "yes") {
        axios
            .delete("http://localhost:5000/api/users/" + vUser.value._id)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    alert("User deleted successfully!");
                    // Redirect to users page
                    window.location.href = "/users";
                } else {
                    alert(response.data.message);
                }
            });
    }
};

const editUser = () => {
    const newUser = createUser();

    if (newUser == null) {
        alert("Please enter an email address and name!");
        return;
    }

    axios
        .put("http://localhost:5000/api/users/" + vUser.value._id, newUser)
        .then((response) => {
            if (response.status === 201) {
                vUser.value = response.data;
                alert("User editted successfully!");
            } else {
                alert(response.data.message);
            }
        });
};

const addUser = () => {
    const newUser = createUser();

    if (newUser == null) {
        alert("Please enter an email address and name!");
        return;
    }

    axios.post("http://localhost:5000/api/users", newUser).then((response) => {
        if (response.status === 201) {
            vUser.value = response.data;
            alert("User added successfully!");
        } else {
            alert(response.data.message);
        }
    });
};

const changeIntoEditMode = async (userId) => {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:5000/api/users/" + userId)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    alert(response.data.message);
                    reject();
                }
            });
    });
};

const getAddUserRoute = () => {
    try {
        return "/records/add/" + vUser.value.email;
    } catch (error) {
        return "/records/add";
    }
};

var recordData = [];
if (userId != null) {
    changeIntoEditMode(userId).then((data) => {
        vUser.value = data;
        isDataLoaded.value = true;
    });
} else {
    isDataLoaded.value = true;
}

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
                        v-model="vUser.email"
                    />
                </div>
                <div class="mb-5">
                    <label for="userName" class="form-label">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="userName"
                        v-model="vUser.name"
                    />
                </div>
                <div class="mb-5">
                    <label for="userAge" class="form-label">Age</label>
                    <input
                        type="number"
                        class="form-control"
                        id="userAge"
                        v-model="vUser.age"
                    />
                </div>
                <div class="mb-5">
                    <label for="userAddress" class="form-label">Address</label>
                    <textarea
                        class="form-control"
                        id="userAddress"
                        rows="6"
                        v-model="vUser.address"
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
                    @click="editUser()"
                >
                    Edit User
                </button>
                <button
                    id="newUserButton"
                    type="button"
                    class="btn btn-danger"
                    @click="deleteUser()"
                >
                    Delete User
                </button>
            </div>
        </div>
        <div class="right-container">
            <h1>User Records</h1>
            <RouterLink :to="getAddUserRoute()" class="btn" v-if="vUser._id!=''">
                <button type="button" class="btn btn-success">
                    Add Record
                </button>
            </RouterLink>
            <br />
            <Table
                v-if="isDataLoaded"
                :datas="vUser.ttvRecords"
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
