<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

//Take data from local storage
const adminName = localStorage.getItem("adminName");
const adminEmail = localStorage.getItem("adminEmail");
const adminId = localStorage.getItem("adminId");
const token = localStorage.getItem("token");
</script>

<template>
    <Navbar/>
    <Suspense>
        <RouterView />
    </Suspense>
</template>
