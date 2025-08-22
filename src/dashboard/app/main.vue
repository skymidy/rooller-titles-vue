<script setup lang="ts">
  import { fetchEvent } from '@/shared/fetchEvents'
  import type { EventSchema, SubEventSchema } from '@/types'
  import type { IEvent, ISubEvent } from '@/types/Event'
  import { useHead } from '@unhead/vue'
  import { useReplicant } from 'nodecg-vue-composable'
  import { onMounted, ref, watch } from 'vue'

  useHead({ title: 'nodecg-roller-race-titles' }) // set the title of this page
  onMounted(() => {
    if (selectedEventReplicant !== undefined)
      selectedEvent.value = selectedEventReplicant.data as IEvent
    if (selectedSubEventReplicant !== undefined)
      selectedSubEvent.value = selectedSubEventReplicant.data as ISubEvent
  })

  //controll block over Events
  const selectedEventReplicant = useReplicant<EventSchema>('SelectedEvent', 'rooller-titles-vue')
  const selectedEvent = ref<IEvent>()
  const eventsOptions = ref<IEvent[]>([])
  watch(selectedEvent, (value, oldvalue) => {
    if (value === oldvalue) return

    if (value === undefined || value.event_id !== selectedSubEvent.value?.id) {
      selectedSubEvent.value = undefined
    }
    if (selectedEventReplicant !== undefined) {
      if (value !== undefined) selectedEventReplicant.data = value
      else selectedEventReplicant.loadDefault()
      selectedEventReplicant.save()
    }
  })

  //controll block over SebEvents
  const selectedSubEventReplicant = useReplicant<SubEventSchema>(
    'SelectedSubEvent',
    'rooller-titles-vue',
  )
  const selectedSubEvent = ref<ISubEvent>()
  watch(selectedSubEvent, (value, oldvalue) => {
    if (value === oldvalue) return

    if (selectedSubEventReplicant !== undefined) {
      if (value !== undefined) selectedSubEventReplicant.data = value
      else selectedSubEventReplicant.loadDefault()
      selectedSubEventReplicant.save()
      console.log(selectedSubEventReplicant.data)
    }
  })
</script>

<template>
  <div style="min-height: 200px">
    <q-select
      v-model="selectedEvent"
      filled
      use-input
      hide-selected
      fill-input
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
    >
      <template v-if="selectedEvent" #append>
        <q-icon
          name="cancel"
          class="cursor-pointer"
          @click.stop.prevent="selectedEvent = undefined"
        />
      </template>
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
          <div class="text-overline text-grey">
            {{ selectedEvent.geoname }}
          </div>
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
      v-model="selectedSubEvent"
      filled
      fill-input
      label="Sub selector"
      :options="selectedEvent.subs"
      :option-label="'name'"
      :option-value="'sub_id'"
      style="width: 450px"
      map-options
    >
      <template v-if="selectedSubEvent" #append>
        <q-icon
          name="cancel"
          class="cursor-pointer"
          @click.stop.prevent="selectedSubEvent = undefined"
        />
      </template>
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
