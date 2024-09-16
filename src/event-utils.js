import calendarList from './assets/data/calendarfromtoenddate.json'

export const formatDate = (date) => {
  // const date = new Date(date).toISOString().replace(/T.*$/, '')

  const ndwDate = new Date(date)
  const formattedDate = ndwDate
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, '-')
  return formattedDate
}

export const formatDateTime = (date) => {
  return new Date().toISOString()
}

const getTime = (date) => {
  const currentDate = new Date(date)
  let hours = currentDate.getHours().toString().padStart(2, '0')
  let minutes = currentDate.getMinutes().toString().padStart(2, '0')
  let meridiem = hours >= 12 ? 'PM' : 'AM'
  // Adjusting hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12
  const currentTime = `${hours}:${minutes} ${meridiem}`

  return currentTime
}

const formatResponse = (item) => ({
  id: `${item.id}`,
  allDay: false,
  start: formatDateTime(item.start),
  end: formatDateTime(item.end),
  title: `${item.job_id.jobRequest_Title}`,
  summary: `${item.summary}`,
  interviewer: `${item.user_det.handled_by.firstName}`,
  date: `${formatDate(item.start)}`,
  time: `${getTime(item.start)} - ${getTime(item.end)}`,
})

export const INITIAL_EVENTS = calendarList.map(formatResponse)
