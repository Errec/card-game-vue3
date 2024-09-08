<!-- src/components/NoMonstersAvailable.vue -->
<template>
  <div
    class="p-6 text-center bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-md"
    role="alert"
  >
    <p class="text-xl font-semibold mb-2">No monsters available</p>
    <p class="text-gray-600">Please try again later.</p>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script>

<!--
  Explanations:
  1. This component displays a message when no monsters are available.
  2. We use Tailwind CSS classes for styling to match the project's design system.
  3. The 'role="alert"' attribute is added for accessibility, indicating that this is important information.
  4. The component is kept simple and reusable, with no props or complex logic.
  5. The message is split into two parts for better readability and potential future customization.
  -->
