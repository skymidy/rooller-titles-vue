<script setup lang="ts">
  import { useHead } from '@unhead/vue'
  import { ref } from 'vue'
  import { fetchMans } from '@/shared/fetchMans'
  import type { RawMan } from '@/types/Man'

  useHead({ title: 'nodecg-roller-race-titles' }) // set the title of this page
  const text = ref<RawMan[]>([])

  setInterval(async () => {
    text.value = await fetchMans('', '', new Date('2025-08-15 09:55:15'), 0, false)
  }, 1000)
</script>

<template>
  <div>
    {{ text[0] }}
  </div>
</template>
