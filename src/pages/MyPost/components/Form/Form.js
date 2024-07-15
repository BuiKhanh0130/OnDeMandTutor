import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import Col from 'react-bootstrap/Col';

import Button from '~/components/Button';
import request from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Form.module.scss';

const cx = classNames.bind(styles);

//URL
const SUBJECT_GROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';
const UPDATE_FROM_URL = 'FormFindTutor/student/updateform';

//expression regex
const POSITIVEREGEX = /^[0-9]+$/;

function Form({ item }) {
    const { setUpdateForm } = useContext(ModalContext);
    const navigate = useNavigate();
    //hard data
    const [numberOfWeeks, setNumberOfWeeks] = useState([]);
    const dayOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hourStart = useMemo(() => [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], []);
    const hourEnd = useMemo(() => [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], []);
    const degrees = useMemo(
        () => ['College', 'Associate Degree', 'Bachelors Degree', 'Masters Degree', 'Doctoral Degree'],
        [],
    );

    //convert day of week
    useEffect(() => {
        const days = item.dayOfWeek.split(' | ');
        let dayNumbers = days.map((day) => {
            return dayOfWeeks.indexOf(day);
        });
        setNumberOfWeeks(dayNumbers);
    }, []);

    console.log(numberOfWeeks);

    //form data
    const [formData, setFormData] = useState({
        tittle: item.title,
        gradeId: 'G0012',
        subjectGroupId: item.subjectId,
        describeTutor: item.description,
        dayStart: item.dayStart,
        dayEnd: item.dayEnd,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
        startDateInput: '',
        endDateInput: '',
        selectedDays: [],
        minHourlyRate: item.minHourlyRate,
        maxHourlyRate: item.maxHourlyRate,
        typeOfDegree: 'College',
        tutorGender: item.maxHourlyRate,
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
    useEffect(() => {
        if (formData.minHourlyRate && formData.maxHourlyRate && formData.minHourlyRate >= formData.maxHourlyRate) {
            setFormData((prev) => ({ ...prev, minHourlyRate: 0 }));
            alert('Max hour rate must be greater than min hourly rate');
        }
    }, [formData.minHourlyRate, formData.maxHourlyRate]);

    //check time
    const checkValidTime = () => {
        const timeStartElement = document.getElementById('timeStart');
        const timeStart = timeStartElement.options[timeStartElement.selectedIndex].value;
        const timeEndStartElement = document.getElementById('timeEnd');
        const endStart = timeEndStartElement.options[timeEndStartElement.selectedIndex].value;
        if (Number(timeStart) >= Number(endStart)) {
            setValidTime(true);
            timeStartElement.selectedIndex = 0;
            alert('Time start must be less than time end');
        }

        if (Number(endStart) - Number(timeStart) >= 4) {
            setValidTime(true);
            timeEndStartElement.selectedIndex = 0;
            alert('The number of study hours cannot exceed 4');
        }
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

        try {
            const response = await requestsPrivate.post(
                UPDATE_FROM_URL,
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
                navigate('/success', { state: 'GENERATE CLASS' });
            }
        } catch (error) {
            console.log(error);
        }
    };
    //select day
    const handleDayClick = (day) => {
        console.log(numberOfWeeks);
        console.log(day);
        if (numberOfWeeks?.includes(day)) {
            setNumberOfWeeks((prev) => prev?.filter((numberDay) => numberDay !== day));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                selectedDays: prevData.selectedDays.includes(day)
                    ? prevData.selectedDays.filter((d) => d !== day)
                    : [...prevData.selectedDays, day],
            }));
        }
    };
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

    //handle cancel update
    const handleCancelUpdate = () => {
        setUpdateForm(false);
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
                        <label htmlFor="minHourlyRate">Min price ($)</label>
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
                        <label htmlFor="maxHourlyRate">Max price ($)</label>
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
                            onChange={(e) => {
                                checkValidTime();
                                if (validTime) {
                                    handleInputChange(e);
                                }
                            }}
                        >
                            {hourStart.length > 0 &&
                                hourStart.map((hour, index) => {
                                    return (
                                        <option key={index} value={hour}>
                                            {hour} hour
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeEnd">Time End</label>
                        <select
                            id="timeEnd"
                            name="timeEnd"
                            onChange={(e) => {
                                checkValidTime();
                                if (validTime) {
                                    handleInputChange(e);
                                }
                            }}
                        >
                            {hourEnd.length > 0 &&
                                hourEnd.map((hour, index) => {
                                    return (
                                        <option value={hour} key={index}>
                                            {hour} hour
                                        </option>
                                    );
                                })}
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
                                        selected:
                                            formData.selectedDays.includes(index) || numberOfWeeks?.includes(index),
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
                    <Button className={cx('requestTutor__container-cancel')} onClick={handleCancelUpdate}>
                        Cancel
                    </Button>
                    <Button className={cx('requestTutor__container-submit', { disabled: isValidForm })}>Submit</Button>
                </div>
            </form>
        </Col>
    );
}

export default Form;
