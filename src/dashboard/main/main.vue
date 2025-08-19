<script setup lang="ts">
  import { useHead } from '@unhead/vue'
  import { ref } from 'vue'

  useHead({ title: 'nodecg-roller-race-titles' }) // set the title of this page
  const text = ref('Example')
</script>

<template>
  <div>
    {{ text }}
  </div>
</template>
