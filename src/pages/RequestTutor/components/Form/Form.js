import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import Col from 'react-bootstrap/Col';

import Button from '~/components/Button';
import request from '~/utils/request';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Form.module.scss';
import { ModalConfirm } from '~/components/Modal';

const cx = classNames.bind(styles);

//URL
const SUBJECT_GROUP_URL = 'subject-group';
const GRADE_URL = 'grade';
const CREATE_FROM_URL = 'formfindtutor/create_form';
const CONCISE_URL = 'formrequesttutor/handle_createform';
//expression regex
const POSITIVEREGEX = /^[0-9]+$/;

function Form() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [accept, setAccept] = useState(false);

    const times = useMemo(() => Array.from({ length: 24 }, (_, i) => i + 1), []);
    //hard data
    const dayOfWeeks = useMemo(() => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'], []);
    const degrees = useMemo(
        () => ['College', 'Associate Degree', 'Bachelors Degree', 'Masters Degree', 'Doctoral Degree'],
        [],
    );
    //form data
    const [formData, setFormData] = useState({
        tittle: '',
        gradeId: 'G0012',
        subjectGroupId: 'S0009',
        describeTutor: '',
        dayStart: new Date(),
        dayEnd: null,
        timeStart: '',
        timeEnd: '',
        startDateInput: '',
        endDateInput: '',
        selectedDays: [],
        minHourlyRate: 1,
        maxHourlyRate: 2,
        typeOfDegree: 'College',
        tutorGender: false,
    });

    //get grade
    const [grades, setGrades] = useState([]);
    //get subject
    const [subjects, setSubjects] = useState([]);
    //Check valid
    const [isValidForm, setIsValidForm] = useState(true);
    const [validTime, setValidTime] = useState(false);
    const [validMinHourlyRate, setValidMinHourlyRate] = useState(false);
    const [minHourlyRateFocus, setValidMinHourlyRateFocus] = useState(false);
    const [validMaxHourlyRate, setValidMaxHourlyRate] = useState(true);
    const [maxHourlyRateFocus, setMaxHourlyRateFocus] = useState(true);

    const requestsPrivate = useRequestsPrivate();

    //check minHourlyRate
    useEffect(() => {
        if (formData.minHourlyRate) {
            const result = POSITIVEREGEX.test(formData.minHourlyRate);
            setValidMinHourlyRate(result);
        }
    }, [formData.minHourlyRate]);
    //check maxHourlyRate
    useEffect(() => {
        if (formData.maxHourlyRate) {
            const result = POSITIVEREGEX.test(formData.maxHourlyRate);
            setValidMaxHourlyRate(result);
        }
    }, [formData.maxHourlyRate]);
    //check minHourlyRate && maxHourlyRate
    const checkValidPrice = () => {
        if (formData.minHourlyRate && formData.maxHourlyRate && formData.minHourlyRate > formData.maxHourlyRate) {
            setFormData((prev) => ({ ...prev, minHourlyRate: 0 }));
            setAccept(false);
            alert('Max hour rate must be greater than min hourly rate');
            return false;
        }
        return true;
    };

    //check time
    const checkValidTime = () => {
        const timeStartElement = document.getElementById('timeStart');
        const timeStart = timeStartElement.options[timeStartElement.selectedIndex].value;
        const timeEndStartElement = document.getElementById('timeEnd');
        const endStart = timeEndStartElement.options[timeEndStartElement.selectedIndex].value;
        if (Number(timeStart) >= Number(endStart)) {
            setValidTime(true);
            timeStartElement.selectedIndex = 0;
            timeEndStartElement.selectedIndex = 0;
            setFormData((prevData) => ({ ...prevData, timeStart: 6, timeEnd: 7 }));
            alert('Time start must be less than time end');
            setAccept(false);
            return false;
        }

        if (Number(endStart) - Number(timeStart) >= 4) {
            setValidTime(true);
            timeStartElement.selectedIndex = 0;
            timeEndStartElement.selectedIndex = 0;
            setFormData((prevData) => ({ ...prevData, timeStart: 6, timeEnd: 7 }));
            alert('Our courses last a maximum of 3 hours');
            return false;
        }
        return true;
    };
    //disable
    useEffect(() => {
        if (
            formData.tittle.length !== 0 &&
            formData.describeTutor.length !== 0 &&
            formData.startDateInput.length !== 0 &&
            formData.endDateInput.length !== 0 &&
            formData.selectedDays.length !== 0
        ) {
            setIsValidForm(false);
        }
    }, [formData]);

    //Get subjects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSubject = async () => {
            try {
                const response = await request.get(SUBJECT_GROUP_URL, { signal: controller.signal });
                isMounted && setSubjects(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getSubject();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    //Get Grade
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const getGrades = async () => {
                const response = await request.get(GRADE_URL, { signal: controller.signal });
                isMounted && setGrades(response.data);
            };
            getGrades();

            return () => {
                isMounted = false;
                controller.abort();
            };
        } catch (error) {
            console.log(error);
        }
    }, []);
    //handle coincide
    const handleCoincide = async (timeStart, timeEnd) => {
        const response = await requestsPrivate.post(
            CONCISE_URL,
            JSON.stringify({
                dayOfWeek: formData.dayOfWeek,
                dayStart: formData.dayStart,
                dayEnd: formData.dayEnd,
                timeStart: timeStart,
                timeEnd: timeEnd,
            }),
        );
        setContent(response.data);
    };

    //handle create form
    const handleSubmit = async (events) => {
        events.preventDefault();

        const timeStart = Number(formData.timeStart);
        const timeEnd = Number(formData.timeEnd);

        if (formData.tittle.length === 0) {
            window.alert('Please fill tittle');
            return;
        } else if (formData.describeTutor.length === 0) {
            window.alert('Please fill description');
            return;
        } else if (formData.dayEnd === null) {
            window.alert('Please choose date end course');
            return;
        } else if (formData.selectedDays.length === 0) {
            window.alert('Please choose at least of week to learn');
            return;
        }
        handleCoincide(timeStart, timeEnd);
        setShowModal(true);
    };

    useEffect(() => {
        const timeStart = Number(formData.timeStart);
        const timeEnd = Number(formData.timeEnd);
        if (accept) {
            handleSubmit2(timeStart, timeEnd);
        }
    }, [accept]);

    const handleSubmit2 = async (timeStart, timeEnd) => {
        if (checkValidTime() && checkValidPrice()) {
            try {
                const response = await requestsPrivate.post(
                    CREATE_FROM_URL,
                    JSON.stringify({
                        gradeId: formData.gradeId,
                        subjectGroupId: formData.subjectGroupId,
                        tittle: formData.tittle,
                        dayStart: formData.dayStart,
                        dayEnd: formData.dayEnd,
                        dayOfWeek: formData.selectedDays.sort((a, b) => a - b).join(','),
                        timeStart: timeStart,
                        timeEnd: timeEnd,
                        minHourlyRate: formData.minHourlyRate,
                        maxHourlyRate: formData.maxHourlyRate,
                        typeOfDegree: formData.typeOfDegree,
                        describeTutor: formData.describeTutor,
                        tutorGender: formData.tutorGender,
                    }),
                );
                if (response.status === 200) {
                    setFormData((prevData) => ({ ...prevData, tittle: '', describeTutor: '' }));
                    setAccept(false);
                    handleCancel();
                    navigate('/success', { state: 'GENERATE CLASS' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    //select day
    const handleDayClick = useCallback((day) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedDays: prevData.selectedDays.includes(day)
                ? prevData.selectedDays.filter((d) => d !== day)
                : [...prevData.selectedDays, day],
        }));
    }, []);
    //change input
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);
    //select date
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
            dayStart: startDateUTC,
            dayEnd: endDateUTC,
            startDateInput: startDateUTC ? format(startDateUTC, 'yyyy-MM-dd') : '',
            endDateInput: endDateUTC ? format(endDateUTC, 'yyyy-MM-dd') : '',
        }));
    }, []);

    //handleSubmit
    const handleAccept = () => {
        setAccept(true);
        setShowModal(false);
    };
    //handle cancel
    const handleCancel = () => {
        setAccept(false);
        setShowModal(false);
    };

    return (
        <Col lg="8" className={cx('requestTutor__container')}>
            <form className={cx('requestTutor__container-body')} onSubmit={handleSubmit}>
                <div className={cx('requestTutor__container-title')}>
                    <label htmlFor="tittle">Title</label>
                    <input id="tittle" name="tittle" type="text" onChange={handleInputChange} value={formData.tittle} />
                </div>
                <div className={cx('requestTutor__container-bag')}>
                    <div className={cx('requestTutor__container-grade')}>
                        <label htmlFor="grades">Grade</label>
                        <select id="grades" name="gradeId" onChange={handleInputChange}>
                            {grades.map((grade, index) => (
                                <option key={index} value={grade.gradeId}>
                                    {grade.number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('requestTutor__container-gender')}>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" onChange={handleInputChange}>
                            <option value={0}>Lady</option>
                            <option value={1}>Gentlemen</option>
                        </select>
                    </div>
                </div>

                <div className={cx('requestTutor__container-bag')}>
                    <div className={cx('requestTutor__container-subject')}>
                        <label htmlFor="subjects">Subject</label>
                        <select id="subjects" name="subjectGroupId" onChange={handleInputChange}>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject.subjectGroupId}>
                                    {subject.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('requestTutor__container-degree')}>
                        <label htmlFor="typeOfDegree">Degree</label>
                        <select id="typeOfDegree" name="typeOfDegree" onChange={handleInputChange}>
                            {degrees.length > 0 &&
                                degrees.map((degree, index) => {
                                    return (
                                        <option key={index} value={degree}>
                                            {degree}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                <div className={cx('requestTutor__container-hour')}>
                    <div className={cx('requestTutor__container-hour-item')}>
                        <label htmlFor="minHourlyRate">Min price (VND)</label>
                        <input
                            type="number"
                            id="minHourlyRate"
                            name="minHourlyRate"
                            aria-invalid={validMinHourlyRate ? 'false' : 'true'}
                            aria-describedby="uidmin"
                            value={formData.minHourlyRate}
                            onChange={handleInputChange}
                            onFocus={() => {
                                setValidMinHourlyRateFocus(true);
                            }}
                            onBlur={() => setValidMinHourlyRateFocus(false)}
                        ></input>
                        <p
                            id="uidmin"
                            className={cx({
                                instructions: minHourlyRateFocus && formData.minHourlyRate && !validMinHourlyRate,
                                offscreen: !(minHourlyRateFocus && formData.minHourlyRate && !validMinHourlyRate),
                            })}
                        >
                            Cannot be negative number
                        </p>
                    </div>
                    <div>
                        <label htmlFor="maxHourlyRate">Max price (VND)</label>
                        <input
                            type="number"
                            id="maxHourlyRate"
                            name="maxHourlyRate"
                            value={formData.maxHourlyRate}
                            aria-invalid={validMaxHourlyRate ? 'false' : 'true'}
                            aria-describedby="uidmax"
                            onChange={handleInputChange}
                            onFocus={handleInputChange}
                            onBlur={() => setMaxHourlyRateFocus(false)}
                        ></input>
                        <p
                            id="uidmax"
                            className={cx({
                                instructions: maxHourlyRateFocus && formData.maxHourlyRate && !validMaxHourlyRate,
                                offscreen: !(maxHourlyRateFocus && formData.maxHourlyRate && !validMaxHourlyRate),
                            })}
                        >
                            Cannot be negative number
                        </p>
                    </div>
                </div>

                <div className={cx('requestTutor__container-hour')}>
                    <div className={cx('requestTutor__container-hour-item')}>
                        <label htmlFor="timeStart">Time Start</label>
                        <select
                            id="timeStart"
                            name="timeStart"
                            value={formData.timeStart}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        >
                            <option value="">Start Hour</option>
                            {times.map((time) => (
                                <option key={time} value={time}>
                                    {time}h
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeEnd">Time End</label>
                        <select
                            id="timeEnd"
                            name="timeEnd"
                            value={formData.timeEnd}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        >
                            <option value="">End Hour</option>
                            {times
                                .filter((time) => time > formData.timeStart)
                                .map((time) => (
                                    <option key={time} value={time}>
                                        {time}h
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className={cx('requestTutor__container-date')}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={[
                            {
                                startDate: formData.dayStart,
                                endDate: formData.dayEnd,
                                key: 'selection',
                            },
                        ]}
                        minDate={new Date()}
                    />

                    <div className={cx('requestTutor__container-dayOfWeek')}>
                        <div className={cx('requestTutor__container-dayOfWeek-label')}>
                            <span>Select the days you will study</span>
                        </div>

                        <div className={cx('requestTutor__container-dayOfWeek-item')}>
                            {dayOfWeeks.map((day, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleDayClick(index)}
                                    className={cx('requestTutor__container-dayOfWeek-item-selected', {
                                        selected: formData.selectedDays.includes(index),
                                    })}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('requestTutor__container-dcs')}>
                    <p>Send a personal note</p>
                    <textarea
                        id="my-textarea"
                        rows="5"
                        cols="30"
                        placeholder="Enter your text here..."
                        name="describeTutor"
                        onChange={handleInputChange}
                        value={formData.describeTutor}
                    ></textarea>
                </div>

                <div className={cx('requestTutor__container-btn')}>
                    <Button className={cx('requestTutor__container-submit', { disabled: isValidForm })}>Submit</Button>
                </div>
            </form>
            {showModal && (
                <ModalConfirm content={content} handleConfirm={handleAccept} handleCancel={handleCancel}></ModalConfirm>
            )}
        </Col>
    );
}

export default Form;
