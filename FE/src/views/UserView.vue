<script setup>
import Table from "@/components/Table.vue";
import axios from "axios";

const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    return res.data;
};
const data = await fetchData();
const headers = ["Name", "Email", "Age", "Address"];
const properties = ["name", "email", "age", "address"];
const colorRanges = [{}, {}, {}, {}];
</script>

<template>
    <div class="table-header-container">
        <h1>User Data</h1>
        <RouterLink to="/users/add" class="btn">
            <button type="button" class="btn btn-success">Add User</button>
        </RouterLink>
    </div>
    <div class="table-container">
        <Table
            :datas="data"
            :headers="headers"
            :properties="properties"
            :color-ranges="colorRanges"
            action-base-path="/users/edit/"
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
