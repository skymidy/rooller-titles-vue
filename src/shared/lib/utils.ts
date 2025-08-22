import type { EventData, SubEvent } from '@/types/Event'

export function quasarLoadBarFilter(url: string) {
  // example (only https://my-service.com/* should trigger)
  return /^https:\/\/orgeo\.ru/.test(url)
}

export function eventDataRebuilder(source: EventData): EventData {
  const newObject: EventData = {
    event_id: source.event_id,
    event_sub_dists: source.event_sub_dists,
    teams: source.teams,
    dists: source.dists,
    subs: source.subs.map(subEventDataRebuilder),
    sub_id: source.sub_id,
    geoname: source.geoname,
    logo: source.logo,
    unix_timestamp: source.unix_timestamp,
    banner_top: source.banner_top,
    banner_bottom: source.banner_bottom,
  }
  return newObject
}
export function subEventDataRebuilder(source: SubEvent): SubEvent {
  const newObject: SubEvent = {
    sub_id: source.sub_id,
    name: source.name,
    radio_texts: source.radio_texts,
    timezone: source.timezone,
    datetime: source.datetime,
    has_flags: (source.has_flags as unknown as string) !== '0',
    id: source.id,
    event_name: source.event_name,
    udate: source.udate,
  }
  return newObject
}
