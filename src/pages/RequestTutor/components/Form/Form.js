import classNames from 'classnames/bind';
import { useState, useEffect, useMemo } from 'react';

import Col from 'react-bootstrap/Col';

import Button from '~/components/Button';
import request from '~/utils/request';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Form.module.scss';

const cx = classNames.bind(styles);

//URL
const SUBJECT_GROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';
const CREATE_FROM_URL = 'FormFindTutor/student/createform';

//expression regex
const POSITIVEREGEX = /^[0-9]+$/;

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function Form() {
    const hours = useMemo(
        () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        [],
    );
    const degrees = useMemo(
        () => ['College', 'Associate Degree', 'Bachelors Degree', 'Masters Degree', 'Doctoral Degree'],
        [],
    );

    const days = useMemo(() => [1, 2, 3, 4, 5, 6, 7], []);

    const [tittle, setTittle] = useState('');
    const [gradeId, setGradeId] = useState('');
    const [tutorGender, setTutorGender] = useState(false);
    const [subjectGroupId, setSubjectGroupId] = useState('');
    const [dayStart, setDayStart] = useState('1');
    const [dayEnd, setDayEnd] = useState('1');
    const [dayOfWeek, setDayOfWeek] = useState('1');
    const [timeStart, setTimeStart] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [minHourlyRate, setMinValueRate] = useState();
    const [maxHourlyRate, setMaxValueRate] = useState();
    const [typeOfDegree, setTypeOfDegree] = useState('College');
    const [describeTutor, setDescribeTutor] = useState('');

    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [isValidForm, setIsValidForm] = useState(false);

    const [validMinHourlyRate, setValidMinHourlyRate] = useState(false);
    const [minHourlyRateFocus, setValidMinHourlyRateFocus] = useState(false);
    const [validMaxHourlyRate, setValidMaxHourlyRate] = useState(true);
    const [maxHourlyRateFocus, setMaxHourlyRateFocus] = useState(true);

    const requestsPrivate = useRequestsPrivate();

    //check minHourlyRate
    useEffect(() => {
        if (minHourlyRate) {
            const result = POSITIVEREGEX.test(minHourlyRate);
            setValidMinHourlyRate(result);
        }
    }, [minHourlyRate]);

    //check maxHourlyRate
    useEffect(() => {
        if (maxHourlyRate) {
            const result = POSITIVEREGEX.test(maxHourlyRate);
            setValidMaxHourlyRate(result);
        }
    }, [maxHourlyRate]);

    //check minHourlyRate && maxHourlyRate
    useEffect(() => {
        if (minHourlyRate && maxHourlyRate && minHourlyRate >= maxHourlyRate) {
            alert('Max hour rate must be greater than min hourly rate');
        }
    }, [minHourlyRate, maxHourlyRate]);

    //check time
    useEffect(() => {
        if (timeStart >= timeEnd) {
            alert('Time start must be less than time end');
        }
    }, [timeStart, timeEnd]);

    //Get subjects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSubject = async () => {
            try {
                const response = await request.get(SUBJECT_GROUP_URL, { signal: controller.signal });
                setSubjectGroupId(response.data[0].subjectGroupId);
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

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const getGrades = async () => {
                const response = await request.get(GRADE_URL, { signal: controller.signal });
                setGradeId(response.data[0].gradeId);
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

        try {
            const response = await requestsPrivate.post(
                CREATE_FROM_URL,
                JSON.stringify({
                    gradeId,
                    subjectGroupId,
                    tittle,
                    dayStart,
                    dayEnd,
                    dayOfWeek,
                    timeStart,
                    timeEnd,
                    minHourlyRate,
                    maxHourlyRate,
                    typeOfDegree,
                    describeTutor,
                    tutorGender,
                }),
            );
            if (response.status === 200) {
                alert('Successfully');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    //disable btn if user had't filled all fields
    useEffect(() => {
        const minPrice = !isNaN(minHourlyRate);
        const maxPrice = !isNaN(maxHourlyRate);
        const tittleEmpty = tittle.trim !== '';
        const descriptionEmpty = describeTutor.trim !== '';
        const dayStartEmpty = isValidDate(dayStart);
        const dayEndEmpty = isValidDate(dayEnd);

        if (minPrice && maxPrice && tittleEmpty && descriptionEmpty && dayStartEmpty && dayEndEmpty) {
            setIsValidForm(true);
        }
    }, [minHourlyRate, maxHourlyRate, tittle, dayStart, dayEnd, describeTutor]);

    //check day start and day end
    useEffect(() => {
        // get values
        const startDateInput = document.getElementById('dayStart');
        const endDateInput = document.getElementById('dayEnd');

        // Add event onchange to check
        startDateInput.addEventListener('change', checkDates);
        endDateInput.addEventListener('change', checkDates);

        function checkDates() {
            // get values of 2 inputs
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);

            // Check day start have smaller than day end
            if (startDate >= endDate) {
                alert('Day start must be smaller than end date ');
                // Put input day start again
                startDateInput.value = '';
            }
        }
    }, [dayStart, dayEnd]);

    return (
        <Col lg="8" className={cx('requestTutor__container')}>
            <form className={cx('requestTutor__container-body')} onSubmit={handleSubmit}>
                <div className={cx('requestTutor__container-title')}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.startsWith(' ')) {
                                return;
                            }
                            setTittle(e.target.value);
                        }}
                        value={tittle}
                    />
                </div>
                <div className={cx('requestTutor__container-bag')}>
                    <div className={cx('requestTutor__container-grade')}>
                        <label htmlFor="grades">Grade</label>
                        <select id="grades" name="grades" onChange={(e) => setGradeId(e.target.value)}>
                            {grades.map((grade, index) => (
                                <option key={index} value={grade.gradeId}>
                                    {grade.number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('requestTutor__container-gender')}>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" onChange={(e) => setTutorGender(e.target.value)}>
                            <option value={false}>Lady</option>
                            <option value={true}>Gentlemen</option>
                        </select>
                    </div>

                    <div className={cx('requestTutor__container-gender')}>
                        <label htmlFor="dayOfWeek">Day of week</label>
                        <select id="dayOfWeek" name="dayOfWeek" onChange={(e) => setDayOfWeek(e.target.value)}>
                            {days.map((day, index) => {
                                return (
                                    <option key={index} value={day}>
                                        {day}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className={cx('requestTutor__container-bag')}>
                    <div className={cx('requestTutor__container-subject')}>
                        <label htmlFor="subjects">Subject</label>
                        <select id="subjects" name="subjects" onChange={(e) => setSubjectGroupId(e.target.value)}>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject.subjectGroupId}>
                                    {subject.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('requestTutor__container-degree')}>
                        <label htmlFor="degree">Degree</label>
                        <select id="degree" onChange={(e) => setTypeOfDegree(e.target.value)}>
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
                        <label htmlFor="timeStart">Min price ($)</label>
                        <input
                            type="number"
                            id="timeEnd"
                            name="minHourlyRate"
                            aria-invalid={validMinHourlyRate ? 'false' : 'true'}
                            aria-describedby="uidmin"
                            onChange={(e) => {
                                setMinValueRate(e.target.value);
                            }}
                            onFocus={() => {
                                setValidMinHourlyRateFocus(true);
                            }}
                            onBlur={() => setValidMinHourlyRateFocus(false)}
                        ></input>
                        <p
                            id="uidmin"
                            className={cx({
                                instructions: minHourlyRateFocus && minHourlyRate && !validMinHourlyRate,
                                offscreen: !(minHourlyRateFocus && minHourlyRate && !validMinHourlyRate),
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
                            aria-invalid={validMaxHourlyRate ? 'false' : 'true'}
                            aria-describedby="uidmax"
                            onChange={(e) => {
                                setMaxValueRate(e.target.value);
                            }}
                            onFocus={() => {
                                setMaxHourlyRateFocus(true);
                            }}
                            onBlur={() => setMaxHourlyRateFocus(false)}
                        ></input>
                        <p
                            id="uidmax"
                            className={cx({
                                instructions: maxHourlyRateFocus && maxHourlyRate && !validMaxHourlyRate,
                                offscreen: !(maxHourlyRateFocus && maxHourlyRate && !validMaxHourlyRate),
                            })}
                        >
                            Cannot be negative number
                        </p>
                    </div>
                </div>

                <div className={cx('requestTutor__container-hour')}>
                    <div className={cx('requestTutor__container-hour-item')}>
                        <label htmlFor="timeStart">Time Start</label>
                        <select id="timeStart" name="timeStart" onChange={(e) => setTimeStart(e.target.value)}>
                            {hours.length > 0 &&
                                hours.map((hour, index) => {
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
                            id="timeStart"
                            name="timeStart"
                            onChange={(e) => {
                                setTimeEnd(e.target.value);
                            }}
                        >
                            {hours.length > 0 &&
                                hours.map((hour, index) => {
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
                    <div className={cx('requestTutor__container-date-item')}>
                        <label htmlFor="hourStart">Day start</label>
                        <input
                            type="date"
                            id="dayStart"
                            name="dayStart"
                            onChange={(e) => {
                                setDayStart(e.target.value);
                            }}
                        ></input>
                    </div>
                    <p>
                        <label htmlFor="hourEnd">Day end</label>
                        <input
                            type="date"
                            id="dayEnd"
                            name="dayEnd"
                            onChange={(e) => {
                                setDayEnd(e.target.value);
                            }}
                        ></input>
                    </p>
                </div>

                <div className={cx('requestTutor__container-dcs')}>
                    <p>Send a personal note</p>
                    <textarea
                        id="my-textarea"
                        rows="5"
                        cols="30"
                        placeholder="Enter your text here..."
                        onChange={(e) => setDescribeTutor(e.target.value)}
                        value={describeTutor}
                    ></textarea>
                </div>
                <div className={cx('requestTutor__container-btn')}>
                    <Button className={cx('requestTutor__container-submit', { disabled: !isValidForm })}>Submit</Button>
                </div>
            </form>
        </Col>
    );
}

export default Form;
