<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    title: String,
    count: Number,
    unit: String,
    rerouteUrl: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <RouterLink :to="props.rerouteUrl" v-if="rerouteUrl">
        <div class="card">
            <div class="card-body">
                <div class="card-title">{{ props.title }}</div>
                <div class="card-content">
                    <span class="count">{{ props.count }}</span>
                    <span class="unit">{{ props.unit }}</span>
                </div>
            </div>
        </div>
    </RouterLink>
    <div class="card" v-else>
        <div class="card-body">
            <div class="card-title">{{ props.title }}</div>
            <div class="card-content">
                <span class="count">{{ props.count }}</span>
                <span class="unit">{{ props.unit }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    color: black;
    width: 20vw;
    margin: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-body {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
}

.card-title {
    font-size: 2rem;
    font-weight: bold;
}

.card-content .count {
    font-size: 6rem;
    font-weight: bold;
    position: relative;
}

.card-content .unit {
    font-size: 1.5rem;
    font-weight: bold;
    position: absolute;
    padding-top: 5rem;
    padding-left: 0.5rem;
}
</style>
