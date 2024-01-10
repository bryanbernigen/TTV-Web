<script setup>
import CountCard from "@/components/DashboardCards/CountCard.vue";
import AddDataCard from "@/components/DashboardCards/AddDataCard.vue";
import { ref } from "vue";
import axios from "axios";

const count = ref({user: 0, record: 0, admin: 0});

const getCount = async () => {
    // Get number of User
    axios.get("http://localhost:5000/api/usercount").then((res) => {
        count.value.user = res.data;
    });

    // Get number of Record
    axios.get("http://localhost:5000/api/recordcount").then((res) => {
        count.value.record = res.data;
    });

    // Get number of Admin
    axios.get("http://localhost:5000/api/admincount").then((res) => {
        count.value.admin = res.data;
    });
};
getCount();

</script>

<template>
    <div class="main-content">
        <h1>Dashboard</h1>
        <div class="dashboard-container mb-5">
            <CountCard title="Number of User" :count="count.user" unit="person" rerouteUrl="/users"/>
            <CountCard title="Number of Record" :count="count.record" unit="record" rerouteUrl="/records" />
            <CountCard title="Number of Admin" :count="count.admin" unit="person"/>
        </div>
        <div class="add-data-container">
            <div class="add-data-half-container">
                <AddDataCard title="Add User" rerouteUrl="users/add" imgUrl="../../assets/img/user.png"/>
            </div>
            <div class="add-data-half-container">
                <AddDataCard title="Add Record" rerouteUrl="records/add" imgUrl="../../assets/img/record.png"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.dashboard-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.mb-5 {
    margin-bottom: 5vh;
}

.add-data-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 2vw;
}
</style>
