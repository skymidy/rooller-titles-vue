export interface RawMan {
  id: string
  ref_id: string
  event_id: string
  sub_id: string
  number: string
  wreid: string
  dist: string
  relay: string | null
  lap: string | null
  name: string
  team: string
  si: string
  phone: string | null
  year: string | null
  start: string | null
  radio: string | null
  finish: string | null
  finish_ms: string | null
  otm: string | null
  score: string | null
  penalty: string | null
  dubl: string | null
  time: string | null
  spl: string
  spl_comment: string | null
  out_of_competition: string
  udate: string
  udate_unix: number
}
export interface Man {
  name: string
  group: string
  start: string
  finish: string
  finish_ms: number | null
  result_status: number | null
  lap: number | null
  relay: string | null
  radio_json: string | null
  flag: string | null
  splits_json: string | null
  split_comments_json: string | null
  bib: string | number
  team: string | null
  udate_unix: number | null
  year: number | null
  dist_tag: string | null
  score: number | null
}
