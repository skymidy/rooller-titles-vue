// Функцию correctDate пришлось сделать из-за сафари.
// dt - timestamp.
// Возвращает объект Date с переданной датой.
// В сафари не работало такое: new Date("2012-12-12 11:11:11") -
// возвращало левую дату. Пришлось сделать date по другому
export function correctDate(dt: string): Date {
  const m = dt.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/)
  if (!m) throw new Error('Invalid date format')
  // m[1]=year, m[2]=month, m[3]=day, m[4]=h, m[5]=m, m[6]=s
  return new Date(
    Number(m[1]),
    Number(m[2]) - 1,
    Number(m[3]),
    Number(m[4]),
    Number(m[5]),
    Number(m[6]),
    0,
  )
}

export function secToHms(seconds: number): string {
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
  ].join(':')
}

export function hmsToSec(time: string | undefined): number {
  if (time) {
    const a = time.split(':')
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
  }
  return 0
}

/**
 * 00:00:09 в 9
 * 00:00:59 в 59
 * 00:01:23 в 1:23
 * 00:12:34 в 12:34
 * 01:12:34 в 1:12:34
 */
export function cutZero(time: string | undefined): string {
  if (!time) return ''
  if (time.substring(0, 4) === '00:0') {
    return time.substring(4)
  } else if (time.substring(0, 3) === '00:') {
    return time.substring(3)
  } else if (time.substring(0, 1) === '0') {
    return time.substring(1)
  }
  return time
}

// добавить нули до корректного hms
export function addZero(str: string): string {
  const l = str.length
  if (l === 4) return '00:0' + str //2:11 = 00:02:11
  if (l === 5) return '00:' + str //11:11 = 00:11:11
  if (l === 6) return '00' + str //:21:11 = 00:21:11
  if (l === 7) return '0' + str // 1:11:44 = 01:11:44
  return str
}

// добавить 0,если только одна цифра
export function pad(num: number): string {
  return num < 10 ? '0' + num : String(num)
}

export function niceDate(date: Date): string {
  let month: string | number = date.getMonth() + 1
  if (month < 10) month = '0' + month
  let day: string = date.getDate().toString()
  if (day.length < 2) day = '0' + day
  return `${day}.${month}.${date.getFullYear()}`
}

export function currentTime(): string {
  const d = new Date()
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${h}:${m}:${s}`
}

// Парсит переданный time на время и милисекунды
export function getHmsAndMs(time: string): { hms: number; ms: number } {
  let hms: number = 0,
    ms: number = 0
  let time_arr: string[]

  if ((time_arr = time.split(',')).length === 2) {
    // Милисекунды разделены запятой.
    hms = Number(time_arr[0])
    ms = Number(time_arr[1])
  } else if ((time_arr = time.split('.')).length === 2) {
    // Милисекунды разделены точкой.
    hms = Number(time_arr[0])
    ms = Number(time_arr[1])
  } else {
    // Не было разделения, будем считать, что нет милисекунд
    hms = Number(time)
  }
  return { hms, ms }
}
