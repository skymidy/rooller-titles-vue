<script setup lang="ts">
  import { fetchEvent } from '@/shared/fetchEvents'
  import type { EventData, Sub } from '@/types/Event'
  import { useHead } from '@unhead/vue'
  import { ref, watch } from 'vue'

  useHead({ title: 'nodecg-roller-race-titles' }) // set the title of this page
  // const text = ref('Example')
  const selectedEvent = ref<EventData>()
  const eventsOptions = ref<EventData[]>([])

  watch(selectedEvent, (value, oldvalue) => {
    if (value === oldvalue) return
    if (value !== undefined) {
      subsOptions.value = value.subs
    } else {
      subsOptions.value = []
      selectedSub.value = undefined
    }
  })

  const subsOptions = ref<Sub[]>([])
  const selectedSub = ref<Sub>()
</script>

<template>
  <div style="min-height: 200px">
    <q-select
      v-model="selectedEvent"
      filled
      use-input
      hide-selected
      fill-input
      clearable
      input-debounce="0"
      label="Event Search"
      :options="eventsOptions"
      :option-label="'event_id'"
      :option-value="'event_id'"
      style="width: 250px"
      map-options
      @filter="
        async (inputValue: string, update, abort) => {
          if (inputValue.length <= 3) {
            abort()
            return
          }
          const result = await fetchEvent(inputValue)
          update(() => {
            eventsOptions.splice(0)
            eventsOptions.push(result)
            console.log(eventsOptions)
          })
        }
      "
      @filter-abort="() => {}"
    >
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-img :src="`${scope.opt.logo}`" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{
                scope.opt.subs.length > 0 && scope.opt.sub_id.length > 0
                  ? scope.opt.subs[Number(scope.opt.sub_id)].event_name
                  : '- Null -'
              }}
            </q-item-label>
            <q-item-label caption>
              {{ scope.opt.geoname }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-card v-if="selectedEvent !== undefined" class="card q-my-sm" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" :src="`${selectedEvent.logo}`" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline text-grey">{{ selectedEvent.geoname }}</div>
          <div class="text-subtitle1">
            {{
              selectedEvent.subs.length > 0 && selectedEvent.sub_id.length > 0
                ? selectedEvent.subs[Number(selectedEvent.sub_id)].event_name
                : '- Null -'
            }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-select
      v-if="selectedEvent !== undefined"
      v-model="selectedSub"
      filled
      hide-selected
      fill-input
      clearable
      input-debounce="0"
      label="Sub selector"
      :options="subsOptions"
      :option-label="'name'"
      :option-value="'sub_id'"
      style="width: 250px"
      map-options
    >
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
      <template #option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>
              {{ scope.opt.name ?? '-- Null --' }}
            </q-item-label>
            <q-item-label caption>
              {{ scope.opt.sub_id }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style lang="css" scoped>
  .card {
    width: 100%;
    max-width: 500px;
  }
</style>
