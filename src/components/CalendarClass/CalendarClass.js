import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CHECK_ATTENDENCE_URL = 'your_api_endpoint_here';

const CalendarClass = ({ events = [] }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [attendance, setAttendance] = useState({});

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
        const event = events.find((event) => dayjs(event.bookDay).isSame(day, 'day'));
        return event ? event.time : '';
    };

    const hasEvent = (day) => {
        return events.some((event) => dayjs(event.bookDay).isSame(day, 'day'));
    };

    const handleAttendanceChange = async (day) => {
        const dateStr = day.format('YYYY-MM-DD');
        const newAttendance = { ...attendance, [dateStr]: !attendance[dateStr] };
        setAttendance(newAttendance);

        try {
            await axios.post(CHECK_ATTENDENCE_URL, { date: dateStr, attended: newAttendance[dateStr] });
            console.log(`Attendance for ${dateStr} updated successfully.`);
        } catch (error) {
            console.error(`Error updating attendance for ${dateStr}:`, error);
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-3">
                <i
                    className="bi bi-caret-left-fill"
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        width: '20px',
                        height: '20px',
                        padding: '3px',
                    }}
                    onClick={handlePrevMonth}
                ></i>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentDate.format('MMMM YYYY')}</span>
                <i
                    className="bi bi-caret-right-fill"
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        width: '20px',
                        height: '20px',
                        padding: '3px',
                    }}
                    onClick={handleNextMonth}
                ></i>
                <button className="btn btn-secondary" style={{ backgroundColor: '#ed6d20' }} onClick={handleToday}>
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
                                    key={day.format('yyyy-MM-dd')}
                                    className={day.month() !== currentDate.month() ? 'text-muted' : ''}
                                    style={{
                                        backgroundColor: day.isSame(dayjs(), 'day')
                                            ? '#ed6d20'
                                            : hasEvent(day)
                                                ? '#fef4e0'
                                                : '#fff',
                                        color: day.isSame(dayjs(), 'day') ? '#fff' : '',
                                    }}
                                >
                                    <div>{day.date()}</div>
                                    <div>{events ? getEventForDay(day) : ''}</div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={attendance[day.format('YYYY-MM-DD')] || false}
                                            onChange={() => handleAttendanceChange(day)}
                                        />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarClass;
