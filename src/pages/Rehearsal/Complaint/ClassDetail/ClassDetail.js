import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './ClassDetail.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import images from '~/assets/images';
import Calendar from '~/components/Calendar/Calendar';
import { CloseIcon } from '~/components/Icons';
import { ModalNotConfirm } from '~/components/Modal';

const cx = classNames.bind(styles);

const VIEW_CLASS_DETAILS_URL = 'class/get_class-detail';
const NOTIFICATION_URL = 'notification/create_notification';
const END_CLASS_URL = 'class/submit_class';
const REFUND_URL = 'wallet/refund_money';

function ClassDetail({ classID, handleHiddenShowDetails, setStatus }) {
    const requestPrivate = useRequestsPrivate();
    const [classes, setClasses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState('');
    const [typeOfNoti, setTypeOfNoti] = useState('');

    console.log(classes);

    //get class detail
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getClassDetail = async () => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`, {
                    signal: controller.signal,
                });
                isMounted && setClasses(response.data);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };
        getClassDetail();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    //handle end class
    const handleEndClass = async () => {
        const response = await requestPrivate.put(`${END_CLASS_URL}/${classID}`);
        console.log(response.status);
        if (response.status === 200) {
            setShowNotification('Class has been close. Thank for support this class!');
            setTypeOfNoti('Success');
            setShowModal(true);
            handleRefund();
            setStatus(true);
        }
    };

    //handle refund
    const handleRefund = async () => {
        const response = await requestPrivate.put(
            REFUND_URL,
            JSON.stringify({ studentId: classes.studentId, amount: classes.price }),
        );


        if (response.status === 200) {
        }
    };

    //const create notification
    const createNotification = async () => {
        try {
            const response = await requestPrivate.post(
                NOTIFICATION_URL,
                JSON.stringify({
                    title: `The class been ended and return the money to your wallet`,
                    description: `check your balance`,
                    url: `/wallet`,
                    accountId: `${classes.accountId}`,
                }),
            );
            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
    };

    //handle close modal
    const handleCloseModal = () => {
        setShowModal(false);
        handleHiddenShowDetails();
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <Row>
                        <Col lg="12" className={cx('container__title')}>
                            <h1>Details Classes</h1>
                        </Col>
                    </Row>

                    <div>
                        <hr className={cx('line_break')} />
                    </div>

                    <Row>
                        <Col lg="4" className={cx('container__class')}>
                            {classes && (
                                <div className={cx('container__class_detail')}>
                                    <div className={cx('container__class-header')}>
                                        <Image
                                            src={classes.avatar}
                                            alt={classes.subjectName}
                                            className={cx('class-avatar')}
                                        />
                                        <span>{classes.subjectName}</span>
                                    </div>
                                    <div className={cx('container__class-body')}>
                                        <p>
                                            <strong>Created On:</strong> {classes.createday}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong> {classes.dayStart}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong> {classes.dayEnd}
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {classes.description}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {classes.price}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Col>
                        {classes ? (
                            <Col lg="8" className={cx('container__mess_detail')}>
                                <Row>
                                    <Col lg="12" className={cx('container__mess_header')}>
                                        <Row>
                                            <div className={cx('class_header')}>
                                                <Image
                                                    src={images.avatarDefaultTutor || classes.avatar}
                                                    alt={classes.subjectName}
                                                    className={cx('class-avatar')}
                                                />
                                                <span>{classes.subjectName}</span>
                                            </div>
                                        </Row>

                                        <Row>
                                            <div className={cx('class_name')}>
                                                <span>{classes.className}</span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <Calendar events={classes.calenders} />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={cx('cancel')}>
                                    <Button orange className={cx('cancel__class')} onClick={handleEndClass}>
                                        Cancel Class
                                    </Button>
                                </Row>
                            </Col>
                        ) : (
                            <div className={cx('container__noclass')}>
                                <span>There are currently no classes available.</span>
                            </div>
                        )}
                    </Row>

                    <div className={cx('close-icon')} onClick={handleHiddenShowDetails}>
                        <CloseIcon />
                    </div>
                    <ModalNotConfirm
                        showModal={showModal}
                        handleCancel={handleCloseModal}
                        content={showNotification}
                        typeError={typeOfNoti}
                    />
                </Container>
            </div>
        </div>
    );
}

export default ClassDetail;
