import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import images from '~/assets/images';
import Image from '~/components/Image';
import { StarIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Clip from '~/components/Clip';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Tutor.module.scss';

const cx = classNames.bind(styles);

const PROFILETUTOR_URL = 'tutor/get_tutor-detail/';
const FEEDBACKTUTOR_URL = 'feedback/get_feedbacks/';
const ADVERTISEMENT_URL = 'tutor-ad/';

function Tutor() {
    const requestPrivate = useRequestsPrivate();
    const { tutorId } = useContext(ModalContext);
    const [userDetails, setUserDetails] = useState();
    const [userFeedbacks, setUserFeedbacks] = useState();
    const [userAd, setUserAd] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTutor = async () => {
            try {
                const response = await requestPrivate.get(`${PROFILETUTOR_URL}${tutorId}`, {
                    signal: controller.signal,
                });
                isMounted && setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getFeedbackTutor = async () => {
            try {
                const response = await requestPrivate.get(`${FEEDBACKTUTOR_URL}${tutorId}`, {
                    signal: controller.signal,
                });
                isMounted && setUserFeedbacks(response.data.listResult);
            } catch (error) {
                console.log(error);
            }
        };

        const getAds = async () => {
            try {
                const response = await requestPrivate.get(`${ADVERTISEMENT_URL}${tutorId}`, {
                    signal: controller.signal,
                });
                console.log(response.data);
                setUserAd(response.data[0].video);
                isMounted && setUserFeedbacks(response.data.listResult);
            } catch (error) {
                console.log(error);
            }
        };

        getTutor();
        getFeedbackTutor();
        getAds();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [tutorId]);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="4" className={cx('container__contact')}>
                        <div className={cx('container__tag')}>
                            <div className={cx('container__tag-info')}>
                                <Image src={images.avatar} alt={'NTP'}></Image>
                                <strong>{userDetails?.fullName}</strong>
                                <p>{userDetails?.headline}</p>
                                <div className={cx('container__tag-rating')}>
                                    <div>
                                        <StarIcon></StarIcon>
                                        <StarIcon></StarIcon>
                                        <StarIcon></StarIcon>
                                        <StarIcon></StarIcon>
                                        <StarIcon></StarIcon>
                                    </div>
                                    <span>{userDetails?.start}</span>
                                    <span>({userDetails?.ratings} ratings)</span>
                                </div>
                                <div className={cx('container__hour')}>
                                    <Image src={images.clock} alt="clock"></Image>
                                    <span>{userDetails?.hourlyRate} hours tutoring</span>
                                </div>
                            </div>
                            <div className={cx('container__tag-connect')}>
                                <strong>Hourly Rate: ${userDetails?.hourlyRate}</strong>
                                <Button orange>
                                    <Link to={`/requestForm`} state={{ key: tutorId }}>
                                        Contact {userDetails?.fullName}
                                    </Link>
                                </Button>
                                <span className={cx('container__tag-connect-respond')}>
                                    Respond time: <strong>7 minutes minutes</strong>
                                </span>
                            </div>
                        </div>
                    </Col>

                    <Col lg="8" className={cx('container__about')}>
                        <div className={cx('container__about-content')}>
                            <p className={cx('container__about-content-title')}>About {userDetails?.fullName}</p>
                            <Clip width={'760px'} height={'356px'} clip={userAd} />
                        </div>

                        <div className={cx('container__about-content')}>
                            <p className={cx('container__about-content-title')}>About {userDetails?.fullName}</p>
                            <Row className={cx('container__about-bio')}>
                                <Col lg="4">
                                    <span>Bio</span>
                                </Col>
                                <Col lg="8">
                                    <p>{userDetails?.description}</p>
                                </Col>
                            </Row>
                            <Row className={cx('container__about-bio')}>
                                <Col lg="4">
                                    <span>Education</span>
                                </Col>
                                <Col lg="8">
                                    <p>{userDetails?.education}</p>
                                </Col>
                            </Row>
                            <Row className={cx('container__about-bio')}>
                                <Col lg="4">
                                    <span>Subject</span>
                                </Col>
                                <Col lg="8">
                                    <p>{userDetails && userDetails.subjectTutors.join()}</p>
                                </Col>
                            </Row>
                        </div>

                        <div className={cx('container__about-rating')}>
                            <p className={cx('container__about-rating-title')}>Reviews</p>
                            <div>
                                <Row className={cx('container__about-rating-review')}>
                                    <Col lg="4" className={cx('container__about-rating-review-title')}>
                                        <span>Reviews</span>
                                    </Col>
                                    <Col lg="8" className={cx('container__about-rating-review-content')}>
                                        {userFeedbacks &&
                                            userFeedbacks.map((review, index) => {
                                                return (
                                                    <div className={cx('container__about-rating-review-item')}>
                                                        <p>{review?.title}</p>
                                                        <p>{review?.description}</p>
                                                        <p className={cx('review-info')}>
                                                            By
                                                            <strong>{review?.fullName}</strong>
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Tutor;
