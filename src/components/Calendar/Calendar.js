import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar = ({ events, hour}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfWeek = startOfMonth.startOf('week');
  const endOfWeek = endOfMonth.endOf('week');

  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  const getEventForDay = (day) => {
    const event = events.find(event => dayjs(event.date).isSame(day, 'day'));
    return event ? event.content : '';
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <button className="btn btn-primary" onClick={handlePrevMonth}>
          Previous
        </button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button className="btn btn-primary" onClick={handleNextMonth}>
          Next
        </button>
        <button className="btn btn-secondary" onClick={handleToday}>
          Today
        </button>
      </div>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day) => (
                <td
                  key={day.format('DD-MM-YYYY')}
                  className={
                    day.month() !== currentDate.month()
                      ? 'text-muted'
                      : day.isSame(dayjs(), 'day')
                      ? 'bg-primary text-white'
                      : ''
                  }
                >
                  <div>{day.date()}</div>
                  <div>{events ? getEventForDay(day) : ""}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
