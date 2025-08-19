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

export function rawManToMan(raw: RawMan): Man {
  return {
    name: raw.name,
    group: raw.dist,
    start: raw.start ?? '',
    finish: raw.finish ?? '',
    finish_ms: raw.finish_ms != null && raw.finish_ms !== '' ? Number(raw.finish_ms) : null,
    result_status: raw.otm != null && raw.otm !== '' ? Number(raw.otm) : null,
    lap: raw.lap != null && raw.lap !== '' ? Number(raw.lap) : null,
    relay: raw.relay,
    radio_json: raw.radio,
    flag: null,
    splits_json: raw.spl ?? null,
    split_comments_json: raw.spl_comment ?? null,
    bib: raw.number,
    team: raw.team ?? null,
    udate_unix: raw.udate_unix ?? null,
    year: raw.year != null && raw.year !== '' ? Number(raw.year) : null,
    dist_tag: null,
    score: raw.score != null && raw.score !== '' ? Number(raw.score) : null,
  }
}
