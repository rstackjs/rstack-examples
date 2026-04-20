<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <p>Start building amazing things with Rsbuild.</p>
  </div>
</template>

<script setup lang="ts">
const title = ref("Rsbuild with Vue");
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
