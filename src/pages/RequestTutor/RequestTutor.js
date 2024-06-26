import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/request';

import styles from './RequestTutor.module.scss';
import useRequestsPrivate from '~/hook/useRequestPrivate';

const cx = classNames.bind(styles);
const SUBJECTGROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';
const CREATEFROM_URL = 'FormFindTutor/student/createform';

function RequestTutor() {
    const [title, setTitle] = useState('');
    const [minValueRate, setMinValueRate] = useState(10);
    const [maxValueRate, setMaxValueRate] = useState(200);
    const [grade, setGrade] = useState('G0012');
    const [gender, setGender] = useState(false);
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [listSubject, setListSubject] = useState([]);
    const [subject, setSubject] = useState('S0010');
    const [description, setDescription] = useState('');
    const [typeDegree, setTypeDegree] = useState('College');
    const requestsPrivate = useRequestsPrivate();

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

    const params = {
        gradeId: grade,
        subjectGroupId: subject,
        typeOfDegree: typeDegree,
        tutorGender: gender,
        tittle: title,
        minHourlyRate: minValueRate,
        maxHourlyRate: maxValueRate,
        describeTutor: description,
    };

    const handleSubmit = async (events) => {
        events.preventDefault();
        try {
            const response = await requestsPrivate.post(CREATEFROM_URL, params);
            setTitle('');
            setDescription('');
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
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

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="8" className={cx('requestTutor__container')}>
                    <form className={cx('requestTutor__container-body')} onSubmit={handleSubmit}>
                        <div className={cx('requestTutor__container-subject')}>
                            <label htmlFor="subjects">Subject</label>
                            <select id="subjects" name="subjects" onChange={(e) => setSubject(e.target.value)}>
                                {listSubject.map((subject, index) => (
                                    <option key={index} value={subject.subjectGroupId}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-degree')}>
                            <label htmlFor="degree">Degree</label>
                            <select id="degree" onChange={(e) => setTypeDegree(e.target.value)}>
                                <option value="College">College</option>
                                <option value="Associate Degree">Associate Degree</option>
                                <option value="Bachelors Degree">Bachelors Degree</option>
                                <option value="Masters Degree">Masters Degree</option>
                                <option value="Doctoral Degree">Doctoral Degree</option>
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-grade')}>
                            <label htmlFor="grades">Grade</label>
                            <select id="grades" name="grades" onChange={(e) => setGrade(e.target.value)}>
                                {fetchedGrades.map((grade, index) => (
                                    <option key={index} value={grade.gradeId}>
                                        {grade.number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-gender')}>
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                                <option value={false}>Lady</option>
                                <option value={true}>Gentlemen</option>
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-title')}>
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className={cx('requestTutor__container-dcs')}>
                            <p>Send a personal note</p>
                            <textarea
                                id="my-textarea"
                                rows="5"
                                cols="30"
                                placeholder="Enter your text here..."
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <input className={cx('requestTutor__container-submit')} type="submit" value="Submit"></input>
                    </form>
                </Col>
                <Col lg="4" className={cx('requestTutor__container-header')}>
                    <div>
                        <h1>Tell Us More</h1>
                        <p>The following information will be shared with our network of experts.</p>
                    </div>
                    <div className={cx('requestTutor__container-rule')}>
                        <div className={cx('requestTutor__container-rule-dcs')}>
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            <p>
                                Use neutral language, free of biases or discrimination. Avoid using language that is
                                discriminatory in terms of gender, race, religion, etc.
                            </p>
                        </div>
                        <div className={cx('requestTutor__container-rule-dcs')}>
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            <p>
                                Write in an objective tone, avoiding emotional language or overly persuasive rhetoric.
                                The goal is to provide clear information, not to "sell" the product or service.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RequestTutor;
