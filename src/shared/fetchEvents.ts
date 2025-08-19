import type { EventData } from '@/types/Event'

// TypeScript version of the find_event logic
export const orgeo_url = 'https://orgeo.ru'

const top_url = orgeo_url + '/online/top'
const titles_url = orgeo_url + '/online/titles'
// const files_url = orgeo_url + '/files'
const ignored_top = [6, 8, 20, 22, 23, 26, 27, 28, 29, 30]

export async function fetchEvent(event_id: string): Promise<EventData> {
  if (Number.isNaN(event_id)) {
    throw new TypeError('event_id must be a number')
  }
  const params = new URLSearchParams({
    id: event_id,
    api: 'json',
    r: String(Math.random()),
  })

  const response = await fetch(`${top_url}?${params.toString()}`)

  if (!response.ok) throw new Error(response.statusText)

  const data: EventData = await response.json()

  return data
}
