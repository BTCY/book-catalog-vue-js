<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router' 
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="48" height="48" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" :key="$route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100%;
}
</style>
