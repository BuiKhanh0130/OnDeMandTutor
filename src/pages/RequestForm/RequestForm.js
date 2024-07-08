import React from 'react'
import classNames from 'classnames/bind'
import styles from './RequestForm.module.scss'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { Link } from 'react-router-dom';
import request from '~/utils/request';
// import DateRange from '~/components/Calendar/DateRange'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
const GRADE_URL = 'Grade';

const cx = classNames.bind(styles)

const PROFILE_TUTOR_URL = 'Tutors/Id/';
const SUBJECTGROUP_URL = 'SubjectGroup';
 

const RequestForm = () => {

    const requestPrivate = useRequestsPrivate();
    const [userDetails, setUserDetails] = useState();
    const { state } = useLocation();
    const [grade, setGrade] = useState('');
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [listSubject, setListSubject] = useState([]);
    const [subject, setSubject] = useState('S0010');
    const [description, setDescription] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [startDateInput, setStartDateInput] = useState()
  const [endDateInput, setEndDateInput] = useState()

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
    setStartDateInput(selection.startDate ? format(selection.startDate, 'yyyy-MM-dd') : '');
    setEndDateInput(selection.endDate ? format(selection.endDate, 'yyyy-MM-dd') : '');
  };
    
    useEffect(() => {
        try {
            const Grades = async () => {
                const response = await request.get(GRADE_URL);
                setFetchedGrades(response.data);
            };
            Grades();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    useEffect(() => {
        const GetSubject = async () => {
            try {
                const response = await request.get(SUBJECTGROUP_URL);
                setListSubject(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        GetSubject();
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTutor = async () => {
            try {
                const response = await requestPrivate.get(`${PROFILE_TUTOR_URL}${state.key}`, {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTutor();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [requestPrivate, state.key]);

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

  return (
    <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row >
                    <Col lg='7' className={cx('container__form')}>
                        <div className={cx('container__form_header')}>
                            <h1>Send a message to {userDetails?.fullName}</h1>
                            <img alt={userDetails?.fullName} src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/434995303_973446541139151_763263780124831767_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGEaab2DIhXQnKqPsXKwNHBI-ox7j02aOYj6jHuPTZo5rbae5KwOXQXTUcwYIa9_UkRdY0hKrnN4U5xRJOclAFl&_nc_ohc=Tifi1Tg3J60Q7kNvgHntohg&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYBYRCiwZsXk9IZKglxlkUS1dCu0fYEqYSkKjCeqKmXffg&oe=668F74F5'></img>
                        </div>
                        <div>
                            <hr className={cx('line_break')}/>
                        </div>
                        <div className={cx('container__form_body')}>
                            <h2>Tell {userDetails?.fullName} about your goals for tutoring</h2>
                            <p>
                                <span>Lession type: Online</span>
                                <span>Hourly rate: ${userDetails?.hourlyRate}</span>
                            </p>
                        </div>

                        <div className={cx('container__form_info')}>
                            <div className={cx('subject_grade')}>

                            <label htmlFor="subjects">Subject: </label>
                                <select id="subjects" name="subjects" onChange={(e) => setSubject(e.target.value)}>
                                    {listSubject.map((subject, index) => (
                                        <option key={index} value={subject.subjectGroupId}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="grades">Grade: </label>
                                <select id="grades" name="grades" onChange={(e) => setGrade(e.target.value)}>
                                    {fetchedGrades.map((grade, index) => (
                                        <option key={index} value={grade.gradeId}>
                                            {grade.number}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>
                                <hr className={cx('line_break')}/>
                            </div>

                            <div className={cx('container__form_input')}>
                                <textarea placeholder='ex. "Hi, I have a big exam coming up..."'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                >

                                </textarea>
                            </div>

                        </div>
                        <div className={cx('container__form_time')}>
                                    <h2>When would you like to meet?</h2>
                            </div>

                            <div className={cx('container__form_button')}>
                            <button
                                className={cx({ active: activeButton === 'Hour' })}
                                onClick={() => handleButtonClick('Hour')}
                            >
                                Hour
                            </button>
                            <button
                                className={cx({ active: activeButton === 'Day' })}
                                onClick={() => handleButtonClick('Day')}
                            >
                                Day
                            </button>
                        </div>

                       {activeButton == 'Day' ? (
                        <div className={cx('Date_Range')}>
                                <DateRange
                                editableDateInputs={true}
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                                ranges={[{ startDate, endDate, key: 'selection' }]}
                                minDate={new Date()}
                                 />
                        </div>) : (
                            <div></div>
                        )
                    }
                    </Col>
                </Row>
            </Container>
    </div>
  )
}

export default RequestForm