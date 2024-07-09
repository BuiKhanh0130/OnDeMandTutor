import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './RequestForm.module.scss';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { Link } from 'react-router-dom';
import request from '~/utils/request';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Calendar from '~/components/Calendar/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import images from '~/assets/images';

const GRADE_URL = 'Grade';
const PROFILE_TUTOR_URL = 'Tutors/Id/';
const SUBJECTGROUP_URL = 'SubjectGroup';
const TUTOR_CALENDAR_URL = 'Classes/showTutorCalender?tutorId=';
const CREATE_REQUEST_URL = 'FormRequestTutor/createForm';

const cx = classNames.bind(styles);

const RequestForm = () => {
    const requestPrivate = useRequestsPrivate();
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        grade: 'G0012',
        subject: 'S0009',
        description: '',
        startDate: new Date(),
        endDate: null,
        startDateInput: '',
        endDateInput: '',
        selectedDays: [],
        startTime: '',
        endTime: '',
    });
    const [userDetails, setUserDetails] = useState();
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [listSubject, setListSubject] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const times = useMemo(() => Array.from({ length: 24 }, (_, i) => i + 1), []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const handleDayClick = useCallback((day) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedDays: prevData.selectedDays.includes(day)
                ? prevData.selectedDays.filter((d) => d !== day)
                : [...prevData.selectedDays, day],
        }));
    }, []);

    const handleSelect = useCallback((ranges) => {
        const { selection } = ranges;
        const startDateUTC = new Date(Date.UTC(selection.startDate.getFullYear(), selection.startDate.getMonth(), selection.startDate.getDate()));
        const endDateUTC = new Date(Date.UTC(selection.endDate.getFullYear(), selection.endDate.getMonth(), selection.endDate.getDate()));

        setFormData((prevData) => ({
            ...prevData,
            startDate: startDateUTC,
            endDate: endDateUTC,
            startDateInput: startDateUTC ? format(startDateUTC, 'yyyy-MM-dd') : '',
            endDateInput: endDateUTC ? format(endDateUTC, 'yyyy-MM-dd') : '',
        }));
    }, []);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await request.get(GRADE_URL);
                setFetchedGrades(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGrades();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await request.get(SUBJECTGROUP_URL);
                setListSubject(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchTutorDetails = async () => {
            try {
                const response = await requestPrivate.get(`${PROFILE_TUTOR_URL}${state.key}`, {
                    signal: controller.signal,
                });
                if (isMounted) setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTutorDetails();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [requestPrivate, state.key]);

    useEffect(() => {
        const fetchCalendar = async () => {
            try {
                const response = await requestPrivate.get(`${TUTOR_CALENDAR_URL}${state.key}`);
                setEvents(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCalendar();
    }, [requestPrivate, state.key]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = {
            tutorId: state.key,
            gradeId: formData.grade,
            subjectGroupId: formData.subject,
            description: formData.description,
            dayStart: formData.startDate,
            dayEnd: formData.endDate,
            dayOfWeek: formData.selectedDays.sort((a, b) => a - b).join(','),
            timeStart: formData.startTime,
            timeEnd: formData.endTime,
        };

        try {
            await requestPrivate.post(CREATE_REQUEST_URL, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Request sent successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg='7' className={cx('container__form')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('container__form_header')}>
                                <h1>Send a message to {userDetails?.fullName}</h1>
                                <img alt={userDetails?.fullName} src={userDetails?.avatar || images.avatarDefaultTutor} />
                            </div>

                            <div>
                                <hr className={cx('line_break')} />
                            </div>

                            <div className={cx('container__form_body')}>
                                <h2>Tell {userDetails?.fullName} about your goals for tutoring</h2>
                                <p>
                                    <span>Lesson type: Online</span>
                                    <span>Hourly rate: ${userDetails?.hourlyRate}</span>
                                </p>
                            </div>

                            <div className={cx('container__form_info')}>
                                <div className={cx('subject_grade')}>
                                    <label htmlFor="subjects">Subject: </label>
                                    <select id="subjects" name="subject" onChange={handleInputChange} value={formData.subject}>
                                        {listSubject.map((subject, index) => (
                                            <option key={index} value={subject.subjectGroupId}>
                                                {subject.subjectName}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="grades">Grade: </label>
                                    <select id="grades" name="grade" onChange={handleInputChange} value={formData.grade}>
                                        {fetchedGrades.map((grade, index) => (
                                            <option key={index} value={grade.gradeId}>
                                                {grade.number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <hr className={cx('line_break')} />
                                </div>

                                <div className={cx('container__form_input')}>
                                    <textarea
                                        placeholder='ex. "Hi, I have a big exam coming up..."'
                                        name="description"
                                        onChange={handleInputChange}
                                        value={formData.description}
                                    />
                                </div>
                            </div>

                            <div className={cx('container__form_time')}>
                                <h2>{userDetails?.fullName}'s schedule</h2>
                            </div>

                            <div className={cx('calendar_tutor')}>
                                <Calendar events={events} />
                            </div>

                            <div className={cx('container__form_time')}>
                                <h2>When would you like to meet?</h2>
                            </div>

                            <div className={cx('Date_Range')}>
                                <div>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={handleSelect}
                                        moveRangeOnFirstSelection={false}
                                        ranges={[{ startDate: formData.startDate, endDate: formData.endDate, key: 'selection' }]}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className={cx('select_day')}>
                                    <div>
                                        <span>Select the days you will study</span>
                                    </div>
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDayClick(index)}
                                            className={cx({ selected: formData.selectedDays.includes(index) })}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>

                                <div className={cx('select_time')}>
                                    <div>
                                        <span>Select the start and end hour</span>
                                        <div className={cx('start_end_hour')}>
                                            <label>
                                                <select name="startTime" value={formData.startTime} onChange={handleInputChange} className="form-select">
                                                    <option value="">Start Hour</option>
                                                    {times.map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}h
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label>
                                                <select name="endTime" value={formData.endTime} onChange={handleInputChange} className="form-select">
                                                    <option value="">End Hour</option>
                                                    {times
                                                        .filter((time) => time > formData.startTime)
                                                        .map((time) => (
                                                            <option key={time} value={time}>
                                                                {time}h
                                                            </option>
                                                        ))}
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('container_submit')}>
                                <input className={cx('button_submit')} type="submit" value="Submit" />
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RequestForm;
