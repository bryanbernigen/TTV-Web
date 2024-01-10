<script setup>
import { ref } from 'vue'

const count = ref(false)

function increment() {
  count.value = true
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
  <button v-if="count">Hello</button>
</template>