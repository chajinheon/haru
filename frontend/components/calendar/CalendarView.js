import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick, select, eventDrag
import koLocale from '@fullcalendar/core/locales/ko'; // Korean locale

const CalendarView = ({ events, onEventClick, onDateClick }) => {
  
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <i>{eventInfo.timeText}</i>
        <b>{eventInfo.event.title}</b>
        {eventInfo.event.extendedProps.description && 
         <p style={{fontSize: '0.8em', margin: '3px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
           {eventInfo.event.extendedProps.description}
         </p>
        }
      </>
    );
  };

  return (
    <div style={{ position: 'relative', zIndex: 0 }}> {/* Ensure calendar is not overlapped by other elements if z-index issues arise */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        locale={koLocale}
        eventContent={renderEventContent}
        eventClick={onEventClick} // Passed from parent
        dateClick={onDateClick} // Passed from parent, for clicking on a date
        editable={true} // Allows dragging and resizing
        selectable={true} // Allows date selection
        dayMaxEvents={true} // true | integer
        height="80vh" // Set a good default height
        // selectMirror={true} // Visual placeholder while selecting
        // eventDrop={(info) => { console.log('Event dropped:', info.event); }}
        // eventResize={(info) => { console.log('Event resized:', info.event); }}
      />
    </div>
  );
};

export default CalendarView;
