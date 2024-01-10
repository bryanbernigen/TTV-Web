<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

const vUser = ref({ _id: "", name: "", email: "", age: "", address: "" });
const vRecord = ref({
    _id: "",
    adminId: "",
    userId: "",
    date: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    pulse: "",
    breathingRate: "",
    temperature: "",
});

const route = useRoute();
const recordId = route.params.recordId;
const userEmail = route.params.email;
var lastSearchedEmail;
const adminName = localStorage.getItem("adminName");

let isExistingUser = true;
var user = null;

const toggleUser = (existingUser) => {
    if (existingUser) {
        isExistingUser = true;
        document.getElementById("userName").disabled = true;
        document.getElementById("userAge").disabled = true;
        document.getElementById("userAddress").disabled = true;
        document
            .getElementById("existingUserButton")
            .classList.add("btn-primary");
        document
            .getElementById("newUserButton")
            .classList.remove("btn-primary");
    } else {
        isExistingUser = false;
        document.getElementById("userName").disabled = false;
        document.getElementById("userAge").disabled = false;
        document.getElementById("userAddress").disabled = false;
        document
            .getElementById("existingUserButton")
            .classList.remove("btn-primary");
        document.getElementById("newUserButton").classList.add("btn-primary");
    }
};

const searchUser = (inputtedEmail = undefined) => {
    if (!isExistingUser) {
        return;
    }

    //Check email validity
    const email = inputtedEmail || vUser.value.email;
    if (!email.includes("@")) {
        alert("Please enter a valid email");
        return;
    }

    //If no change in email, do nothing
    if (user && user.email === email) {
        return;
    }

    //Search user
    axios
        .get(`http://localhost:5000/api/users/email/${email}`)
        .then((response) => {
            if (response.status === 200) {
                if (response.data) {
                    vUser.value = response.data;
                } else {
                    vUser.value.name = "";
                    vUser.value.age = "";
                    vUser.value.address = "";
                }
            } else {
                alert(response.data.message);
            }
        });
};

const createNewRecord = () => {
    const adminId = localStorage.getItem("adminId");
    const userId = vUser.value._id;
    const date = vRecord.value.date;
    const bloodPressureSystolic = vRecord.value.bloodPressureSystolic;
    const bloodPressureDiastolic = vRecord.value.bloodPressureDiastolic;
    const pulse = vRecord.value.pulse;
    const breathingRate = vRecord.value.breathingRate;
    const temperature = vRecord.value.temperature;

    const newRecord = {
        adminId,
        userId,
        date,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        pulse,
        breathingRate,
        temperature,
    };

    return newRecord;
};

const createNewUser = async () => {
    return new Promise((resolve, reject) => {
        if (isExistingUser) {
            resolve();
            return;
        }

        const email = vUser.value.email;
        const name = vUser.value.name;
        const age = vUser.value.age;
        const address = vUser.value.address;

        if (!email || !name) {
            alert("Please fill in email and name");
            reject();
        }

        const newUser = {
            email,
            name,
            age,
            address,
        };

        axios
            .post("http://localhost:5000/api/users", newUser)
            .then((response) => {
                if (response.status === 201) {
                    vUser.value = response.data;

                    resolve();
                } else {
                    alert(response.data.message);
                    reject();
                }
            });
    });
};

const submitRecord = async () => {
    await createNewUser();

    const newRecord = createNewRecord();

    axios
        .post("http://localhost:5000/api/records", newRecord)
        .then((response) => {
            if (response.status === 201) {
                alert("Record Added successfully");
                //Refresh page
                window.location.href = "/records/add";
            } else {
                alert(response.data.message);
            }
        });
};

const updateRecord = async () => {
    await createNewUser();

    const newRecord = createNewRecord();

    axios
        .put("http://localhost:5000/api/records/" + recordId, newRecord)
        .then((response) => {
            if (response.status === 200) {
                alert("Record Updated successfully");
                //Refresh page
                window.location.href = "/records/edit/" + recordId;
            } else {
                alert(response.data.message);
            }
        });
};

const deleteRecord = () => {
    //Confirm delete
    const res = prompt(
        "Are you sure you want to delete this record? Type yes to confirm"
    );
    if (res !== "yes") {
        return;
    }

    //Delete record
    axios
        .delete("http://localhost:5000/api/records/" + recordId)
        .then((response) => {
            if (response.status === 200) {
                alert("Record Deleted successfully");
                //Back to Record Page
                window.location.href = "/records";
            } else {
                alert(response.data.message);
            }
        });
};

const changeIntoEditMode = async (recordId) => {
    axios
        .get("http://localhost:5000/api/records/" + recordId)
        .then((response) => {
            if (response.status === 200) {
                vUser.value = response.data.userId;
                //Auto fill record info
                vRecord.value = response.data;
                vRecord.value.adminName = adminName;
                vRecord.value.date = response.data.date.split("T")[0];
                console.log(vRecord.value.date);
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

if (recordId) {
    changeIntoEditMode(recordId);
} else if (userEmail) {
    searchUser(userEmail);
}
</script>

<template>
    <div class="record-container">
        <div class="half-container">
            <h1>User</h1>
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
                        @keyup.enter="searchUser()"
                        @blur="searchUser()"
                        v-model="vUser.email"
                    />
                </div>
                <div class="mb-5">
                    <label for="userName" class="form-label">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="userName"
                        disabled
                        v-model="vUser.name"
                    />
                </div>
                <div class="mb-5">
                    <label for="userAge" class="form-label">Age</label>
                    <input
                        type="number"
                        class="form-control"
                        id="userAge"
                        disabled
                        v-model="vUser.age"
                    />
                </div>
                <div class="mb-5">
                    <label for="userAddress" class="form-label">Address</label>
                    <textarea
                        class="form-control"
                        id="userAddress"
                        rows="6"
                        disabled
                        v-model="vUser.address"
                    ></textarea>
                </div>
            </form>
            <div class="multi-button-container">
                <button
                    id="existingUserButton"
                    type="button"
                    class="btn btn-primary"
                    @click="toggleUser(true)"
                >
                    Existing User
                </button>
                <button
                    id="newUserButton"
                    type="button"
                    class="btn"
                    @click="toggleUser(false)"
                >
                    New User
                </button>
            </div>
        </div>
        <div class="half-container">
            <h1>TTV Record</h1>
            <br />
            <form>
                <div class="mb-5">
                    <label for="adminName" class="form-label">Admin Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="adminName"
                        :placeholder="adminName"
                        disabled
                    />
                </div>
                <div class="mb-5">
                    <label for="date" class="form-label">Date</label>
                    <input
                        type="date"
                        class="form-control"
                        id="date"
                        v-model="vRecord.date"
                    />
                </div>
                <div class="mb-5">
                    <label for="bloodPressure" class="form-label"
                        >Blood Pressure</label
                    >
                    <div id="bloodPressure">
                        <div>
                            <label for="systoleBloodPressure" class="form-label"
                                >Systole</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="systoleBloodPressure"
                                v-model="vRecord.bloodPressureSystolic"
                            />
                        </div>
                        <div class="separator">/</div>
                        <div>
                            <label
                                for="diastoleBloodPressure"
                                class="form-label"
                                >Diastole</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="diastoleBloodPressure"
                                v-model="vRecord.bloodPressureDiastolic"
                            />
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <label for="pulse" class="form-label">Pulse</label>
                    <input
                        type="number"
                        class="form-control"
                        id="pulse"
                        v-model="vRecord.pulse"
                    />
                </div>
                <div class="mb-5">
                    <label for="breathingRate" class="form-label"
                        >Breathing Rate</label
                    >
                    <input
                        type="number"
                        class="form-control"
                        id="breathingRate"
                        v-model="vRecord.breathingRate"
                    />
                </div>
                <div class="mb-5">
                    <label for="temperature" class="form-label"
                        >Temperature</label
                    >
                    <input
                        type="number"
                        class="form-control"
                        id="temperature"
                        v-model="vRecord.temperature"
                    />
                </div>
            </form>
            <button
                v-if="recordId == null"
                type="button"
                class="btn btn-success"
                @click="submitRecord()"
            >
                Submit Record
            </button>
            <div v-else class="multi-button-container">
                <button
                    type="button"
                    class="btn btn-success"
                    @click="updateRecord()"
                >
                    Update Record
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteRecord()"
                >
                    Delete Record
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#bloodPressure {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.separator {
    font-size: x-large;
    margin-top: 2vh;
}
.record-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.half-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    height: 100%;
}

.mb-5 {
    margin-bottom: 2vh;
}

.half-container form {
    width: 80%;
}

.multi-button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2vw;
}
</style>
