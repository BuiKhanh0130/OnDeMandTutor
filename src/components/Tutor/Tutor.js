import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Tutor.module.scss';
import { useEffect, useState } from 'react';
import Image from '../Image';

const cx = classNames.bind(styles);
const GET_TUTOR_STUDENT_BY_ID_URL = 'tutor/get_tutor-detail';

function Tutor({ id, onHide }) {
    const requestPrivate = useRequestsPrivate();
    const [tutor, setTutor] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getStudentById = async () => {
            try {
                const response = await requestPrivate.get(`${GET_TUTOR_STUDENT_BY_ID_URL}/${id}`, {
                    signal: controller.signal,
                });

                console.log(response.data);
                isMounted && setTutor(response.data);
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
                    <Image src={tutor?.avatar} alt={tutor?.fullName}></Image>
                </Col>
                <Col lg="8">
                    <div className={cx('container__student-profile')}>
                        <p>Full name</p>
                        <span>{tutor?.fullName}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Gender</p>
                        <span>{tutor?.gender === true ? 'Male' : 'Female'}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Headline</p>
                        <span>{tutor?.headline}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Total rate</p>
                        <span>{tutor?.ratings}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Hour rating</p>
                        <span>{tutor?.hourlyRate}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Education</p>
                        <span>{tutor?.education}</span>
                    </div>
                    <div className={cx('container__student-profile')}>
                        <p>Type Of Degree</p>
                        <span>{tutor?.typeOfDegree}</span>
                    </div>
                    <div className={cx('container__student-profile-dsc')}>
                        <p>Description</p>
                        <span>{tutor?.description}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Tutor;
