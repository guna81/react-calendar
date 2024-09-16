import React from 'react'
import { formatDate } from '../event-utils'
import { INITIAL_EVENTS } from '../event-utils'
import CloseIcon from '../icons/CloseIcon'

export function Sidebar({
  weekendsVisible,
  handleWeekendsToggle,
  currentEvents,
  onClose,
}) {
  const filteredEvents = INITIAL_EVENTS.filter((event) => {
    return formatDate(event.start) == formatDate(currentEvents[0].start)
  })

  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-header'>
        <h2>Meetings</h2>
        <CloseIcon style={{ cursor: 'pointer' }} onClick={onClose} />
      </div>
      <hr />

      <div className='demo-app-sidebar-section'>
        <ul>
          {filteredEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function SidebarEvent({ event }) {
  return (
    <li className='event-detail' key={event.id}>
      <div className='event-title'>{event.title}</div>
      <div>
        {event.summary} <span className='vr' /> Interviewer: {event.interviewer}
      </div>
      <div>
        Date: {event.date} <span className='vr' />
        Time: {event.time}
      </div>
    </li>
  )
}
