// fetchAndValidate.ts
// Data fetch and validation logic extracted from right Vue component

// fetchAndValidate.ts
// Data fetch and validation logic extracted from right Vue component
import { type Man, type RawMan } from '@/types/Man'

const orgeo_url = 'https://orgeo.ru'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const top_url = orgeo_url + '/online/top'
const titles_url = orgeo_url + '/online/titles'
// const files_url = orgeo_url + '/files'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ignored_top = [6, 8, 20, 22, 23, 26, 27, 28, 29, 30]
// const ignored_last = ignored_top.concat([2, 3, 4, 5, 7, 24, 25])

// Example: Validation result type
export interface ValidationResult {
  valid_man: Man
  dangers: string[]
  warnings: string[]
  info: string[]
  need_ignore: boolean
}

// Fetch mans data (AJAX call)

export async function fetchMans(
  event_id: string,
  sub_id: string,
  max_udate: Date,
  delay: number,
  load_all: boolean = false,
): Promise<RawMan[]> {
  const params = new URLSearchParams({
    event_id: String(event_id),
    sub_id: String(sub_id),
    max_udate: max_udate ? String(max_udate) : '',
    get_all_data: load_all ? '1' : '0',
    delay: String(delay),
    r: String(Math.random()),
  })
  const response = await fetch(`${titles_url}?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Failed to fetchMans: ${response.statusText}`)
  }

  return response.json()
}

export function validateMan(rawMan: RawMan): ValidationResult {
  let need_ignore = false
  const dangers: string[] = []
  const warnings: string[] = []
  const info: string[] = []

  const valid_man: Man = rawManToMan(rawMan)

  if (
    valid_man.group &&
    typeof valid_man.group === 'string' &&
    valid_man.group.toUpperCase() === 'EMPTY'
  ) {
    need_ignore = true
    info.push('Обнаружен участник с группой EMPTY, его не показываем')
  }

  if (!valid_man.start) {
    warnings.push('Не установлен старт, присваиваем ему 00:00:00')
    valid_man.start = '00:00:00'
  }

  return {
    valid_man: valid_man as Man,
    dangers,
    warnings,
    info,
    need_ignore,
  }
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
