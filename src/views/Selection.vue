<template>
  <div class="selection">
    <button @click="goTo('driver')">Driver</button>
    <button @click="goTo('user')">User</button>
  </div>
</template>

<script setup>
import router from "../router";

const goTo = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped></style>
