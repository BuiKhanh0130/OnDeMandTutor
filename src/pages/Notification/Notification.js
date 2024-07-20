import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { ModalContext } from '~/components/ModalProvider';
import images from '~/assets/images';

import styles from './Notification.module.scss';

const cx = classNames.bind(styles);
const NOTIFICATION_DETAIL_URL = 'notification/get_notification-detail';
const NOTIFICATION_LIST_URL = 'notification/get_notifications';

const Notification = () => {
    const { conn, avatar, setFormId, notifications, setNotifications, setConnection } = useContext(ModalContext);
    const [notificationList, setNotificationList] = useState([]);
    const [selectedNoti, setSelectedNoti] = useState(null);
    const requestPrivate = useRequestsPrivate();

    const sendNotification = async (username, chatRoom) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl('https://localhost:7262/chatHub')
                .configureLogging(LogLevel.Information)
                .build();

            conn.on('ReceiveNotification', (msg) => {
                setNotifications((noti) => [...noti, { msg }]);
            });

            await conn.start();
            await conn.invoke('JoinSpecificChatRoom', { username, chatRoom });

            setConnection(conn);
        } catch (e) {
            console.log(e);
        }
    };

    const stopChatRoom = async () => {
        await conn.stop();
        setConnection('');
    };

    const fetchNotificationDetail = async (id) => {
        try {
            const response = await requestPrivate.get(`${NOTIFICATION_DETAIL_URL}?id=${id}`);
            setSelectedNoti(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await requestPrivate.get(NOTIFICATION_LIST_URL);
                setNotificationList(response.data);
                if (response.data.length > 0) {
                    fetchNotificationDetail(response.data[0].notificationId);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotifications();
    }, [requestPrivate]);

    const selectNotification = (id) => {
        fetchNotificationDetail(id);
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="12" className={cx('container__title')}>
                        <h1>Notifications</h1>
                    </Col>
                </Row>
                {notificationList.length > 0 ? (
                    notificationList.map((noti, index) => (
                        <Row>
                            <Col lg="4" className={cx('container_user')}>
                                <Row className={cx('container_user_item')}>
                                    <Col
                                        key={index}
                                        lg="12"
                                        className={cx('container_user_detail')}
                                        onClick={() => selectNotification(noti.notificationId)}
                                    >
                                        <img alt="react" src={noti?.avatar || images.avatarDefault}></img>
                                        <div className={cx('user_item')}>
                                            <Col className={cx('content_left')}>
                                                <Row>
                                                    <span>{noti?.fullName}</span>
                                                </Row>
                                                <Row>
                                                    <p>{noti?.title}</p>
                                                </Row>
                                                <Row className={cx('content_day')}>
                                                    <p>{noti?.createDay}</p>
                                                </Row>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="8" className={cx('container__detail')}>
                                <div className={cx('container__mess_detail')}>
                                    <Row>
                                        <Col lg="12" className={cx('container__mess_header')}>
                                            <img alt="react" src={selectedNoti?.avatar || images.avatarDefault}></img>
                                            <Row>
                                                <span>{selectedNoti?.fullName}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12" className={cx('container__mess_chatbox')}>
                                            <span className={cx('header_noti')}>Hello {avatar.fullName},</span>
                                            <div className={cx('body_noti')}>
                                                <p>
                                                    {selectedNoti?.fullName} {selectedNoti?.title}
                                                </p>
                                                <Link
                                                    to={selectedNoti?.url}
                                                    onClick={() => {
                                                        setFormId(noti.notificationId);
                                                    }}
                                                >
                                                    Click here
                                                </Link>
                                                <span>, {selectedNoti?.description}</span>
                                            </div>
                                            <div className={cx('final_noti')}>
                                                <p>Thank you for reading the announcement.</p>
                                                <p>Best regards.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    ))
                ) : (
                    <div className={cx('container__noNoti')}>
                        <span>There are currently no classes available.</span>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Notification;
