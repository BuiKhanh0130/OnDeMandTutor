import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import requests from '~/utils/request';

import styles from './Subject.module.scss';

const cx = classNames.bind(styles);

//URL
const SUBJECT_GROUP_URL = 'SubjectGroup';
const GRADE_URL = 'Grade';

function Subject() {
    const [subjectGroupId, setSubjectGroupId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [gradeId, setGradeId] = useState('');
    const [grades, setGrades] = useState([]);

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

    return (
        <>
            <div className={cx('tutor__subject')}>
                <label id="subject">Subject</label>
                <select id="subject">
                    {subjects.map((subject) => (
                        <option value={subject.subjectGroupId}>{subject.subjectName}</option>
                    ))}
                </select>
            </div>
            <div className={cx('tutor__grade')}>
                <label id="grade">Grade</label>
                <select id="grade">
                    {grades.map((grade) => (
                        <option value={grade.gradeId}>{grade.number}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Subject;
