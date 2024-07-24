import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { StarIcon } from '~/components/Icons';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import { Col } from 'react-bootstrap';

import styles from './AboutTutor.module.scss';

const cx = classNames.bind(styles);
const GET_TUTOR_BY_ID_URL = 'tutor/get_tutor-detail';

function AboutTutor({ tutorId }) {
    const requestPrivates = useRequestsPrivate();
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        const getTutor = async () => {
            try {
                const response = await requestPrivates.get(`${GET_TUTOR_BY_ID_URL}/${tutorId}`);
                console.log(response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTutor();
    }, [tutorId]);

    return (
        <Col lg="4">
            <div className={cx('container__tag')}>
                <div className={cx('container__tag-info')}>
                    <Image src={userDetails?.avatar} alt={'NTP'}></Image>
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
                    <Button orange to={`/requestForm`} state={{ key: userDetails?.accountId }}>
                        View more {userDetails?.fullName}
                    </Button>
                    <span className={cx('container__tag-connect-respond')}>
                        Respond time: <strong>7 minutes minutes</strong>
                    </span>
                </div>
            </div>
        </Col>
    );
}

export default AboutTutor;
