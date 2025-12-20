import React from 'react';
import './CalendarView.css';

function CalendarView({ tasks }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    // Adjust for timezone offset to compare correctly with local date string
    // Or simpler: just compare YYYY-MM-DD parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${d}`;
    
    const dayTasks = tasks.filter(task => {
        if (!task.due_date) return false;
        return task.due_date.startsWith(dateString);
    });

    days.push(
      <div key={day} className="calendar-day">
        <div className="day-number">{day}</div>
        <div className="day-tasks">
          {dayTasks.map(task => (
            <div key={task.id} className="calendar-task" title={task.title}>
              {task.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <h2>{today.toLocaleString('default', { month: 'long' })} {currentYear}</h2>
      <div className="calendar-grid">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
        {days}
      </div>
    </div>
  );
}

export default CalendarView;
