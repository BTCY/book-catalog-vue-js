<script setup lang="ts">
import { RouterView } from "vue-router";
import BaseLayout from "./layouts/BaseLayout.vue";
import Header from "./components/Header.vue";
import "./App.css";
</script>

<template>
  <BaseLayout>

    <template v-slot:header>
      <Header></Header>
    </template>


    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :key="$route.fullPath" />
      </KeepAlive>
    </RouterView>

  </BaseLayout>
</template>
 
