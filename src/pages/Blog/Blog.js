import classNames from 'classnames/bind';
import { useMemo } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
    const videos = useMemo(
        () => [
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
            {
                subject: 'Math',
                gender: 'male',
                typeOfDegree: 'Master',
                description:
                    'Experience teaching and tutoring middle school students, especially 9th grade. Effective teaching methods to help my child master the material and improve academic performance. Friendly, enthusiastic, and able to motivate my child to engage with the learning process. Availability to provide lessons at our home during afternoons/evenings on weekdays. Reasonable tutoring rates.',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                {videos.map((video, index) => {
                    return (
                        <Row key={index} className={cx('container__hero')}>
                            <Col lg="8" className={cx('container__card')} key={index}>
                                <form className={cx('container__form-control')} action="Get">
                                    <div className={cx('container__form-control-portfolio')}>
                                        <strong>Subject: </strong>
                                        <span> {video.subject}</span>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <strong>Desired tutor gender: </strong>
                                        <span> {video.gender}</span>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <strong>Type of degree: </strong>
                                        <span> {video.typeOfDegree}</span>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <strong>Description: </strong>
                                        <span> {video.description}</span>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Apply"
                                        className={cx('container__form-control-submit')}
                                    ></input>
                                </form>
                            </Col>

                            <Col lg="4" className={cx('container_avatar')}>
                                <Image src={images.avatar} alt="NTP"></Image>
                                <p>Nguyen Thanh Phong</p>
                                <Button orange medium className={cx('container_avatar-chat')}>
                                    Chat with Phong
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}

export default Blog;
