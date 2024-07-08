import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import styles from './CreateClass.module.scss';
import classNames from 'classnames/bind';

import { CloseIcon } from '~/components/Icons';
import request from '~/utils/request';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

const SUBJECTGROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';
const CREATE_CLASS_URL = 'Classes/tutor/createClass';

const CreateClass = () => {
    const { setCreateClass } = useContext(ModalContext);
    const requestsPrivate = useRequestsPrivate();
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('S0009');
    const [description, setDescription] = useState('');
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [listSubject, setListSubject] = useState([]);
    const [grade, setGrade] = useState('G0012');
    const [hour, setHour] = useState(1);
    const [day, setDay] = useState(1);
    const [studentId, setStudentId] = useState('99fc1f0b-925e-426a-8b64-4ca669e76f31');
    const days = [1, 2, 3, 4, 5, 6, 7];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const params = {
        className: name,
        description: description,
        gradeId: grade,
        hourPerDay: hour,
        dayPerWeek: day,
        studentId: studentId,
        subjectGroupId: subject,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await requestsPrivate.post(CREATE_CLASS_URL, params);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

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
        try {
            const GetGrades = async () => {
                const response = await request.get(GRADE_URL);
                setFetchedGrades(response.data);
            };
            GetGrades();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>FORM CREATE CLASS</div>
                    <div className={cx('body')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('form_row')}>
                                <span htmlFor="title">Name</span>
                                <input type="text" id="title" name="title" onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className={cx('subject_grade')}>
                                <div className={cx('form_row_subject')}>
                                    <span htmlFor="subject">Subject</span>
                                    <select id="subject" name="subject" onChange={(e) => setSubject(e.target.value)}>
                                        {listSubject.map((subject, index) => {
                                            return (
                                                <option key={index} value={subject.subjectGroupId}>
                                                    {subject.subjectName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className={cx('form_row_grade')}>
                                    <span htmlFor="grades">Grade</span>

                                    <select id="grades" name="grades" onChange={(e) => setGrade(e.target.value)}>
                                        {fetchedGrades.map((grade, index) => (
                                            <option key={index} value={grade.gradeId}>
                                                {grade.number}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={cx('day_hour')}>
                                <div className={cx('form_row_hour')}>
                                    <span htmlFor="hourADay">HourADay</span>

                                    <select id="hourADay" name="hourADay" onChange={(e) => setHour(e.target.value)}>
                                        {hours.map((hour, index) => {
                                            return (
                                                <option key={index} value={hour}>
                                                    {hour}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className={cx('form_row_day')}>
                                    <span htmlFor="Days">Days/Week</span>

                                    <select id="Days" name="Days" onChange={(e) => setDay(e.target.value)}>
                                        {days.map((day, index) => (
                                            <option key={index} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={cx('form_row_text')}>
                                <textarea
                                    id="my-textarea"
                                    rows="5"
                                    cols="30"
                                    placeholder="Describe your courses..."
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>
                            <div className={cx('form_row_subject')}>
                                <span htmlFor="subject">Subject</span>

                                <select id="subject" name="subject" onChange={(e) => setSubject(e.target.value)}>
                                    {listSubject.map((subject, index) => {
                                        return (
                                            <option key={index} value={subject.subjectGroupId}>
                                                {subject.subjectName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className={cx('form_row_grade')}>
                                <span htmlFor="grades">Grade</span>

                                <select id="grades" name="grades" onChange={(e) => setGrade(e.target.value)}>
                                    {fetchedGrades.map((grade, index) => (
                                        <option key={index} value={grade.gradeId}>
                                            {grade.number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={cx('day_hour')}>
                                <div className={cx('form_row_hour')}>
                                    <span htmlFor="hourADay">HourADay</span>

                                    <select id="hourADay" name="hourADay" onChange={(e) => setHour(e.target.value)}>
                                        {hours.map((hour, index) => {
                                            return (
                                                <option key={index} value={hour}>
                                                    {hour}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className={cx('form_row_day')}>
                                    <span htmlFor="Days">Days/Week</span>

                                    <select id="Days" name="Days" onChange={(e) => setDay(e.target.value)}>
                                        {days.map((day, index) => (
                                            <option key={index} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={cx('form_row_text')}>
                                <textarea
                                    id="my-textarea"
                                    rows="5"
                                    cols="30"
                                    placeholder="Describe your courses..."
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>
                            <div className={cx('button-submit')}>
                                <input type="submit" value="Submit"></input>
                            </div>
                        </form>
                 
                    </div>
                    <div onClick={() => setCreateClass(false)}>
                        <CloseIcon className={cx('close-icon')} />
                    </div>
                </div>
            </div>
            </div>
    );
};

export default CreateClass;
