import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import { Sidebar } from './components/Sidebar'

export default function App() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  // function handleDateSelect(selectInfo) {

  // }

  const [selectedDay, setSelectedDay] = useState(null)

  const handleClose = () => {
    setSelectedDay(null)
  }

  function handleEventClick(clickInfo) {
    setSelectedDay(clickInfo.event.start)
  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }

  const getFirstEventsOfTheDay = (events) => {
    const firstEvents = []

    const eventsByDate = events.reduce((acc, event) => {
      const eventDate = event.start.split('T')[0] // Extract the date part (YYYY-MM-DD)
      if (!acc[eventDate]) {
        acc[eventDate] = []
      }
      acc[eventDate].push(event)
      return acc
    }, {})

    // Get the first event for each day
    Object.values(eventsByDate).forEach((eventsOnSameDay) => {
      const firstEvent = eventsOnSameDay.reduce((earliest, current) =>
        new Date(current.start) < new Date(earliest.start) ? current : earliest
      )

      firstEvent.events_count = eventsOnSameDay.length
      firstEvents.push(firstEvent)
    })

    return firstEvents
  }

  const filteredEvents = getFirstEventsOfTheDay(INITIAL_EVENTS)

  console.log({ filteredEvents })

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          dayMaxEvents={false}
          dayMaxEventRows={false}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          weekends={weekendsVisible}
          initialEvents={filteredEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

      {selectedDay && (
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <div className='render-event-content'>
      <div className='event-content'>
        {/* <b>{eventInfo.timeText}</b> */}
        <div>{eventInfo.event.title}</div>
        <div>Interviewer: {eventInfo.event.extendedProps.interviewer}</div>
        <div>Time: {eventInfo.event.extendedProps.time}</div>

        {eventInfo.event.extendedProps.events_count && (
          <span className='event-count'>
            {eventInfo.event.extendedProps.events_count}
          </span>
        )}
      </div>
    </div>
  )
}
