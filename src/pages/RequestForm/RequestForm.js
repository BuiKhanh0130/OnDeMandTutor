import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './RequestForm.module.scss';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import request from '~/utils/request';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Calendar from '~/components/Calendar/Calendar';
import images from '~/assets/images';


const PROFILE_TUTOR_URL = 'tutor/get_tutor-detail/';
const TUTOR_CALENDAR_URL = 'class/get_tutor-calenders?tutorId=';
const CREATE_REQUEST_URL = 'formrequesttutor/create_form';

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
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [listSubject, setListSubject] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    console.log(selectedGrade, selectedSubject);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const times = useMemo(() => Array.from({ length: 24 }, (_, i) => i + 1), []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'subject') {
            setSelectedSubject(value);
        } else if (name === 'grade') {
            setSelectedGrade(value);
        }
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
        const startDateUTC = new Date(
            Date.UTC(selection.startDate.getFullYear(), selection.startDate.getMonth(), selection.startDate.getDate()),
        );
        const endDateUTC = new Date(
            Date.UTC(selection.endDate.getFullYear(), selection.endDate.getMonth(), selection.endDate.getDate()),
        );

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
                let GRADE_URL = 'grade';
                if (selectedGrade !== null) {
                    GRADE_URL+="?subjectGroupId="+selectedSubject;
                }
                const response = await request.get(GRADE_URL);
                console.log(response.data);
                setFetchedGrades(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGrades();
    }, [selectedSubject]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                let SUBJECTGROUP_URL = 'subject-group';
                if(selectedSubject !== null) {
                    SUBJECTGROUP_URL+="?gradeId="+selectedGrade;
                }
                const response = await request.get(SUBJECTGROUP_URL);
                console.log(response.data);
                setListSubject(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubjects();
    }, [selectedGrade]);

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

    const validateForm = () => {
        const { description, startDate, endDate, selectedDays, startTime, endTime } = formData;
        return description && startDate && endDate && selectedDays.length > 0 && startTime && endTime;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }

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
            const response = await requestPrivate.post(CREATE_REQUEST_URL, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setModalContent(response.data);
                setShowModal(true);
          
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="7" className={cx('container__form')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('container__form_header')}>
                                <h1>Send a message to {userDetails?.fullName}</h1>
                                <img
                                    alt={userDetails?.fullName}
                                    src={userDetails?.avatar || images.avatarDefaultTutor}
                                />
                            </div>

                            <div>
                                <hr className={cx('line_break')} />
                            </div>

                            <div className={cx('container__form_body')}>
                                <h2>Tell {userDetails?.fullName} about your goals for tutoring</h2>
                                <p>
                                    <span>Lesson type: Online</span>
                                    <span>Hourly rate: {userDetails?.hourlyRate} VNĐ</span>
                                </p>
                            </div>

                            <div className={cx('container__form_info')}>
                                <div className={cx('subject_grade')}>
                                    <label htmlFor="subjects">Subject: </label>
                                    <select
                                        id="subjects"
                                        name="subject"
                                        onChange={handleInputChange}
                                        value={formData.subject}
                                    >
                                        {listSubject.map((subject, index) => (
                                            <option key={index} value={subject.subjectGroupId}>
                                                {subject.subjectName}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="grades">Grade: </label>
                                    <select
                                        id="grades"
                                        name="grade"
                                        onChange={handleInputChange}
                                        value={formData.grade}
                                    >
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
                                        ranges={[
                                            {
                                                startDate: formData.startDate,
                                                endDate: formData.endDate,
                                                key: 'selection',
                                            },
                                        ]}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className={cx('select_day')}>
                                    <div>
                                        <span>Select the days you will study</span>
                                    </div>
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                                        (day, index) => (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick={() => handleDayClick(index)}
                                                className={cx({ selected: formData.selectedDays.includes(index) })}
                                            >
                                                {day}
                                            </button>
                                        ),
                                    )}
                                </div>

                                <div className={cx('select_time')}>
                                    <div>
                                        <span>Select the start and end hour</span>
                                        <div className={cx('start_end_hour')}>
                                            <label>
                                                <select
                                                    name="startTime"
                                                    value={formData.startTime}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                >
                                                    <option value="">Start Hour</option>
                                                    {times.map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}h
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label>
                                                <select
                                                    name="endTime"
                                                    value={formData.endTime}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                >
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RequestForm;
