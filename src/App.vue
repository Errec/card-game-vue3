<!-- src/App.vue -->
<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script setup lang="ts">
// Using Vue 3 Composition API with <script setup>
import HomeView from "./views/HomeView.vue";

// No need for explicit component registration with <script setup>
</script>

<!--
Improvements:
1. Used <script setup> for more concise Composition API usage.
2. Removed unnecessary component options (components, name) as they're not needed with <script setup>.
3. Kept the root component simple, delegating main content to HomeView.
-->
