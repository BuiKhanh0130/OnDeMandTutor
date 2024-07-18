import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Calendar from '~/components/Calendar/Calendar';
import Image from '~/components/Image';
import images from '~/assets/images';
import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'class/get_student-classes';
const VIEW_CLASS_DETAILS_URL = 'class/get_class-detail';
const STUDENT_BROWSERCLASS_URL = 'class/student_browse-class';
const CONVERSATION_URL = 'conversation-account';
const CREATE_NOTIFICATION_URL = 'notification/create_notification';
const REQUEST_PAYMENT_URL = 'vnpay/create_payment_url';
const RESPONSE_PAYMENT_URL = 'vnpay/payment_return';
const WALLETID_ADMIN = 'ae4a3ebf-cf45-48a3-a947-59f22ab327d5';
const VNPAYID = 'ce5ebcf3-d4fb-49a7-bca6-1ce10dd76d3f';
const PAY_DESTINATION_URL = 'paymentdestination/viewlist'

const Classes = () => {
    const { avatar } = useContext(ModalContext);
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true });
    const [message, setMessage] = useState('Vuilongthanhtoan');
    const [paymentId, setPaymentId] = useState(localStorage.getItem('paymentid'));
    const [price, setPrice] = useState(200000);
    const [userId, setUserId] = useState('');

    const requestPrivate = useRequestsPrivate();


    const fetchPayDestination = useCallback(async () => {
        try {
            const response = await requests.get(PAY_DESTINATION_URL);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching PayDestination:', error);
        }
    },[])

    const handleChangeSelect = useCallback((value) => {
        let status = null;
        let isApprove = null;

        if (value === 'In Process') {
            isApprove = true;
        } else if (value === 'Well Done') {
            status = true;
            isApprove = true;
        }

        setFilterParams({ status, isApprove });
    }, []);

    const handlePayment = useCallback(async () => {
        try {
            const response = await requests.post(REQUEST_PAYMENT_URL, {
                walletId: WALLETID_ADMIN,
                paymentDestinationId: VNPAYID,
                amount: price,
                description: encodeURIComponent(message),
            });
            localStorage.setItem('paymentid', response.data.paymentId);
            setPaymentId(response.data.paymentId);
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            console.error('Error during payment request:', error);
        }
    }, [price, message]);

    const fetchClasses = useCallback(async () => {
        try {
            const { status, isApprove } = filterParams;
            let API_URL = `${VIEW_CLASS_LIST_URL}`;

            if (status !== null || isApprove !== null) {
                const params = new URLSearchParams();
                if (status !== null) params.append('status', status);
                if (isApprove !== null) params.append('isApprove', isApprove);
                API_URL += `?${params.toString()}`;
            }

            const response = await requestPrivate.get(API_URL);
            setClasses(response.data.listResult);
            setSize(response.data.listResult.length);
            if (response.data.listResult.length > 0) {
                setClassID(response.data.listResult[0].classid);
                setUserId(response.data.listResult[0].userId);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, [filterParams, requestPrivate]);

    const handlePaymentResponse = useCallback(
        async (paramsObject) => {
            if (!paymentId) return;

        try {
            const response = await requests.post(`${RESPONSE_PAYMENT_URL}/${paymentId}`, paramsObject);
            localStorage.removeItem('paymentid');
            if (response.data === '00') {
                await requests.put(`${STUDENT_BROWSERCLASS_URL}?classId=${classID}&action=true`);
                await requestPrivate.post(`${CONVERSATION_URL}?userId=${userId}`);
                await requestPrivate.post(CREATE_NOTIFICATION_URL, {
                    title: `${avatar.fullName} has accepted your class.`,
                    description: 'follow them and start your lesson!',
                    url: '/classTutor',
                    accountId: userId
                });
                fetchClasses();
            } else {
                console.error('Payment was not successful:', response.data);
            }
        } catch (err) {
            console.error('Error during payment response handling:', err);
        }
    }, [paymentId, classID, userId, avatar.fullName, fetchClasses, requestPrivate]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramsObject = Object.fromEntries(urlParams.entries());
        handlePaymentResponse(paramsObject);
    }, [handlePaymentResponse]);

    const fetchClassesDetail = useCallback(async (classID) => {
        try {
            const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`);
            setCalendar(response.data.calenders);
        } catch (error) {
            console.error('Error fetching class details:', error);
        }
    }, [requestPrivate]);
    

    useEffect(() => {
        if (classID) {
            fetchClassesDetail(classID);
        }
    }, [classID, fetchClassesDetail]);

    useEffect(() => {
        fetchClasses();
        fetchPayDestination();
    }, [fetchClasses, fetchPayDestination]);

    const handleClassClick = (classs) => {
        setClassID(classs.classid);
        setUserId(classs.userId);
        setPrice(classs.price);
        fetchClassesDetail(classs.classid);
    };

    const selectedClass = useMemo(() => classes.find((classs) => classs.classid === classID), [classes, classID]);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="12" className={cx('container__title')}>
                        <h1>Student Classes</h1>
                    </Col>
                </Row>

                <div>
                    <hr className={cx('line_break')} />
                </div>

                <Row>
                    <Col lg="12" className={cx('container__filter')}>
                        <select onChange={(e) => handleChangeSelect(e.target.value)}>
                            <option value="In Process">In Process</option>
                            <option value="NotComplete">Unpaid Class</option>
                            <option value="Well Done">Well Done</option>
                        </select>
                        <span>Total: {size}</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4" className={cx('container__class')}>
                        {classes.map((classs, index) => (
                            <div
                                key={index}
                                className={cx('container__class_detail')}
                                onClick={() => handleClassClick(classs)}
                            >
                                <div className={cx('container__class-header')}>
                                    <Image
                                        src={classs.avatar}
                                        alt={classs.subjectName}
                                        className={cx('class-avatar')}
                                    />
                                    <span>{classs.subjectName}</span>
                                </div>
                                <div className={cx('container__class-body')}>
                                    <p>
                                        <strong>Created On:</strong> {classs.createday}
                                    </p>
                                    <p>
                                        <strong>Start Date:</strong> {classs.dayStart}
                                    </p>
                                    <p>
                                        <strong>End Date:</strong> {classs.dayEnd}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {classs.description}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> {classs.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Col>
                    {selectedClass ? (
                        <Col lg="8" className={cx('container__mess_detail')}>
                            <Row>
                                <Col lg="12" className={cx('container__mess_header')}>
                                    <Row>
                                        <div className={cx('class_header')}>
                                            <Image
                                                src={images.avatarDefaultTutor || selectedClass.avatar}
                                                alt={selectedClass.subjectName}
                                                className={cx('class-avatar')}
                                            />
                                            <span>{selectedClass.subjectName}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className={cx('class_name')}>
                                            <span>{selectedClass.className}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Calendar events={calendar} />
                                    </Row>

                                    <Row>
                                        {filterParams.status === null && filterParams.isApprove === null ? (
                                            <div className={cx('container_avatar-buttons')}>
                                                <button className={cx('container_avatar-button', 'reject')} >
                                                    Reject
                                                </button>
                                                <button
                                                    className={cx('container_avatar-button')}
                                                    onClick={handlePayment}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <div className={cx('container__noclass')}>
                            <span>There are currently no classes available.</span>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Classes;
