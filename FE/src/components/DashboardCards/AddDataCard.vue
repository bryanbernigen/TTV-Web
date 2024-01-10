<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    title: String,
    imgUrl: String,
    rerouteUrl: String,
});

const getImageUrl = () => {
    return new URL(props.imgUrl, import.meta.url).href;
};

</script>

<template>
    <RouterLink :to="props.rerouteUrl">
        <div class="card">
            <h1>{{ props.title }}</h1>
            <img :src="getImageUrl()" alt="" />
        </div>
    </RouterLink>
</template>

<style scoped>
.card {
    margin: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card h1 {
    font-size: 5rem;
    font-weight: bold;
}

.card img {
    aspect-ratio: 1/1;
    height: 40vh;
    margin: 1vw;
}
</style>
