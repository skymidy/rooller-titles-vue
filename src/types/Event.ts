export const ABSOLUTE_PREF = 'absolute_'
export const POINT_START_KEY = '_start'
export const POINT_FINISH_KEY = '_finish'
export const POINT_START_VALUE = 'Start'
export const POINT_FINISH_VALUE = 'Finish'
export const DEFAULT_LAP_VALUE = 'Lap'
export const DEFAULT_SCORE_VALUE = 'sc.'

export type SubEvent = {
  sub_id: string
  name: string
  radio_texts: string | undefined
  timezone: string // UTC
  datetime: string
  has_flags: boolean
  id: string
  event_name: string
  udate: string
}

export type EventInfo = {
  name: string | null
  city: string | null
  logo: string | null
}

export type EventData = {
  event_id: string
  event_sub_dists: { dist_tag: string }[]
  teams: Array<string>
  dist: Array<string>
  subs: Array<SubEvent>
  sub_id: string
  geoname: string
  logo: string | null
  unix_timestamp: number
  banner_top: string | null
  banner_bottom: string | null
}
