import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Student.module.scss';
import { useEffect, useState } from 'react';
import Image from '../Image';

const cx = classNames.bind(styles);
const GET_STUDENT_BY_ID_URL = 'student/find_student_byid';

function Student({ id, setAccountIdBan, setIsActive }) {
    const requestPrivate = useRequestsPrivate();
    const [student, setStudent] = useState();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getStudentById = async () => {
            try {
                const response = await requestPrivate.get(
                    GET_STUDENT_BY_ID_URL,
                    { params: { idStudent: id } },
                    { signal: controller.signal },
                );
                setIsActive(response.data.accountIsActive);
                setAccountIdBan(response.data.accountId);
                isMounted && setStudent(response.data);
            } catch (error) {}
        };

        getStudentById();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [id, requestPrivate]);
    return (
        <Container className={cx('container')}>
            <Row>
                <Col lg="4" className={cx('container__student-img')}>
                    <Image src={student?.avatar} alt={student?.fullName}></Image>
                </Col>
                <Col lg="8">
                    <div className={cx('container__student-profile')}>
                        <p>Full name</p>
                        <span>{student?.fullName}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Email</p>
                        <span>{student?.email}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Gender</p>
                        <span>{student?.gender === true ? 'Male' : 'Female'}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Age</p>
                        <span>{student?.age}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Current school</p>
                        <span>{student?.schoolName}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Join</p>
                        <span>{student?.createDay.split('T')[0]}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Student;
