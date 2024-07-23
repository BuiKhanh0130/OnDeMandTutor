import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import ModalLoading from '~/components/ModalLoading';

import styles from './Subject.module.scss';

const cx = classNames.bind(styles);

const CREATEWALLET_URL = 'wallet/create_wallet';

//URL
const SUBJECT_GROUP_URL = 'subject-group';
const GRADE_URL = 'grade';
const REGISTER_URL = 'tutor/registrate_tutor-subject';

function Subject() {
    const navigate = useNavigate();
    const { userId, setChooseSubject, tutorId, setActive , setTutorId} = useContext(ModalContext);
    const [completed, setCompleted] = useState(true);
    const [subjectGroupId, setSubjectGroupId] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [gradeId, setGradeId] = useState([]);
    const [gradeValid, setGradeValid] = useState(false);
    const [grades, setGrades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState();

    console.log(tutorId);

    //Get subjects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSubject = async () => {
            try {
                const response = await requests.get(SUBJECT_GROUP_URL, { signal: controller.signal });
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

    const handleCreateWallet = async () => {
        try {
            const response = await requests.post(CREATEWALLET_URL, JSON.stringify({ id: userId }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.status === 200) {
                setActive(true);
                setCompleted(true);
                navigate('/');
            }
        } catch (error) {}
    };

    //Get Grade
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const getGrades = async () => {
                const response = await requests.get(GRADE_URL, { signal: controller.signal });
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

    //handle set grade
    const handleGrade = (e) => {
        if (!gradeValid) {
            setGradeValid(true);
        }
        if (gradeId?.includes(e.target.getAttribute('value'))) {
            setGradeId((prev) => prev.filter((gradeId) => !gradeId.includes(e.target.getAttribute('value'))));
            return;
        }
        setGradeId((prev) => [...prev, e.target.getAttribute('value')]);
    };

    const handleSubmit = async () => {
        try {
            setCompleted(false);
            const response = await requests.post(
                REGISTER_URL,
                JSON.stringify({ tutorId: tutorId, subjectGroupId, gradeId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );

            console.log(response.data);
            setError(response.data);

            if (response.status === 200) {
                setTutorId(tutorId);
                setGradeId([]);
                setSubjectGroupId(subjects[0].subjectGroupId);
                setCompleted(true);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //handle finished
    const handleFinished = () => {
        setCompleted(false);
        if (!gradeValid) {
            alert('Please choose at least one subject as well as one grade to finished the registration');
            return;
        }
        setChooseSubject(false);
        handleCreateWallet();
    };

    //handle close message
    const handleCloseModal = () => setShowModal(false);
    return (
        <p>
            {!completed && (
                <ModalLoading>
                    <div className={cx('spinner')}>
                        <span>Loading...</span>
                        <div className={cx('half-spinner')}></div>
                    </div>
                </ModalLoading>
            )}
            <div className={cx('modal')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('tutor__subject')}>
                            <label id="subject">Subject</label>
                            <select id="subject">
                                {subjects.map((subject) => (
                                    <option
                                        key={subject.subjectGroupId}
                                        value={subject.subjectGroupId}
                                        onChange={(e) => {
                                            setSubjectGroupId(e.target.value);
                                        }}
                                    >
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('tutor__grade')}>
                            <h3 id="grade">Grade</h3>
                            <div className={cx('container__items')}>
                                {grades.map((grade) => (
                                    <span
                                        key={grade.gradeId}
                                        value={grade.gradeId}
                                        onClick={handleGrade}
                                        className={cx('container__items-grade', {
                                            selected: gradeId.includes(grade.gradeId),
                                        })}
                                    >
                                        {grade.number}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={cx('btn')}>
                            <button className={cx('submit')} onClick={handleSubmit}>
                                Send
                            </button>
                            <button className={cx('submit')} onClick={handleFinished}>
                                Finished
                            </button>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error ? error : 'Your request has been save successfully! Please choose more subject and grade if you want or finished if you had finished your choose'}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </p>
    );
}

export default Subject;
