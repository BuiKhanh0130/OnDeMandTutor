import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import requests from '~/utils/request';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Subject.module.scss';

const cx = classNames.bind(styles);

//URL
const SUBJECT_GROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';
const REGISTER_URL = 'Tutors/RegistrateTutorSubject';

function Subject() {
    const { tutorId, setChooseSubject, setActive } = useContext(ModalContext);
    const navigate = useNavigate();
    const [subjectGroupId, setSubjectGroupId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [gradeId, setGradeId] = useState([]);
    const [grades, setGrades] = useState([]);

    console.log(gradeId);
    //Get subjects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSubject = async () => {
            try {
                const response = await requests.get(SUBJECT_GROUP_URL, { signal: controller.signal });
                console.log(response.data);
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

    //Get Grade
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const getGrades = async () => {
                const response = await requests.get(GRADE_URL, { signal: controller.signal });
                console.log(response.data);
                setGradeId((prev) => {
                    return [response.data[0].gradeId];
                });
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

    const handleSubmit = async () => {
        try {
            const response = await requests.post(REGISTER_URL, JSON.stringify({ tutorId, subjectGroupId, gradeId }));

            if (response.status === 200) {
                setChooseSubject(false);
                setActive(true);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('tutor__subject')}>
                        <label id="subject">Subject</label>
                        <select
                            id="subject"
                            onChange={(e) => {
                                setSubjectGroupId(e.target.value);
                            }}
                        >
                            {subjects.map((subject) => (
                                <option value={subject.subjectGroupId}>{subject.subjectName}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('tutor__grade')}>
                        <label id="grade">Grade</label>
                        <select
                            id="grade"
                            onChange={(e) => {
                                setGradeId((prev) => {
                                    return [...prev, e.target.value];
                                });
                            }}
                        >
                            {grades.map((grade) => (
                                <option value={grade.gradeId}>{grade.number}</option>
                            ))}
                        </select>
                    </div>
                    <Button className={cx('submit')} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Subject;
