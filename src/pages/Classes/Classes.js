import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Calendar from '~/components/Calendar/Calendar';
import Image from '~/components/Image';
import images from '~/assets/images';
import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import Complaint from '../Complaint';
import PaymentModal from './PaymentModal/PaymentModal';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'class/get_student-classes';
const VIEW_CLASS_DETAILS_URL = 'class/get_class-detail';
const STUDENT_BROWSERCLASS_URL = 'class/student_browse-class';
const CONVERSATION_URL = 'conversation-account';
const CREATE_NOTIFICATION_URL = 'notification/create_notification';
const VNPAY_REQUEST_PAYMENT_URL = 'vnpay/create_payment_url';
const VNPAY_RESPONSE_PAYMENT_URL = 'vnpay/payment_return';
const MOMO_RESQUEST_PAYMENT_URL = 'momo/create_url';
const MOMO_RESPONSE_PAYMENT_URL = 'momo/payment_return';
const WALLETID_ADMIN = 'b6632c5a-a172-4213-b691-1137e0b693ac';
const PAY_DESTINATION_URL = 'paymentdestination/viewlist';

const Classes = () => {
    const { complaint, setComplaint, avatar } = useContext(ModalContext);
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true, isCancel: false });
    const [message, setMessage] = useState('Payforthecourse');
    const [transactionId, setTransactionId] = useState(localStorage.getItem('transactionId'));
    const [selectedClassId, setSelectedClassID] = useState(localStorage.getItem('selectedClassId'))
    const [price, setPrice] = useState(200000);
    const [userId, setUserId] = useState('');
    const [vnpayId, setVnPayId] = useState('');
    const [momoId, setMomoId] = useState('');
    const [vnpayIMG, setVnPayIMG] = useState('');
    const [momoIMG, setMomoIMG] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const requestPrivate = useRequestsPrivate();

    const fetchPayDestination = useCallback(async () => {
        try {
            const response = await requests.get(PAY_DESTINATION_URL);
            console.log(response.data);
            setVnPayId(response.data[0].id);
            setMomoId(response.data[1].id);
            setVnPayIMG(response.data[0].bankLogo);
            setMomoIMG(response.data[1].bankLogo);
        } catch (error) {
            console.error('Error fetching PayDestination:', error);
        }
    }, []);

    const handleChangeSelect = useCallback((value) => {
        let status = null;
        let isApprove = null;
        let isCancel = false;

        if (value === 'In Process') {
            isApprove = true;
        } else if (value === 'Well Done') {
            status = true;
            isApprove = true;
        } else if (value === 'Cancled Class') {
            isCancel = true;
        }

        setFilterParams({ status, isApprove, isCancel });
    }, []);

    const handlePayment = useCallback(() => {
        setShowPaymentModal(true);
    }, []);

    const handleSelectPaymentMethod = useCallback(
        async (method) => {
            setShowPaymentModal(false);
            try {
                let paymentUrl = '';
                let response = null;

                if (method === 'VNPAY') {
                    response = await requests.post(VNPAY_REQUEST_PAYMENT_URL, {
                        walletId: WALLETID_ADMIN,
                        paymentDestinationId: vnpayId,
                        type: 1,
                        amount: price,
                        description: encodeURIComponent(message),
                    });
                    paymentUrl = response.data.paymentUrl;
                } else if (method === 'MOMO') {
                    response = await requests.post(MOMO_RESQUEST_PAYMENT_URL, {
                        walletId: WALLETID_ADMIN,
                        paymentDestinationId: momoId,
                        type: 1,
                        amount: price,
                        description: encodeURIComponent(message),
                        orderId: 'payment123'
                    });
                    paymentUrl = response.data.paymentUrl;
                }

                localStorage.setItem('transactionId', response.data.transactionId);
                localStorage.setItem('selectedClassId', classID);
                setTransactionId(response.data.transactionId);
                window.location.href = paymentUrl;
            } catch (error) {
                console.error('Error during payment request:', error);
            }
        },
        [price, message, classID, vnpayId, momoId]
    );

    const handleCancle = useCallback(async () => {
        try {
            const selectedClassId = localStorage.getItem('selectedClassId');
            const response = await requests.post(`${STUDENT_BROWSERCLASS_URL}/cancel_class`, { classid: selectedClassId });
            if (response.data === true) {
                const newClasses = classes.filter((item) => item.classid !== selectedClassId);
                setClasses(newClasses);
                localStorage.removeItem('selectedClassId');
            }
        } catch (error) {
            console.error('Error cancelling class:', error);
        }
    });

    const fetchClasses = useCallback(async () => {
        try {
            const { status, isApprove, isCancel } = filterParams;
            let API_URL = `${VIEW_CLASS_LIST_URL}`;

            if (status !== null || isApprove !== null || isCancel !== null) {
                const params = new URLSearchParams();
                if (status !== null) params.append('status', status);
                if (isApprove !== null) params.append('isApprove', isApprove);
                params.append('isCancel', isCancel);
                API_URL += `?${params.toString()}`;
                console.log(API_URL);
            }

            const response = await requestPrivate.get(API_URL);
            console.log(response.data.listResult);
            setClasses(response.data.listResult);
            setSize(response.data.listResult.length);
            if (response.data.listResult.length > 0) {
                setPrice(response.data.listResult[0].price);
                setClassID(response.data.listResult[0].classid);
                setUserId(response.data.listResult[0].userId);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, [filterParams, requestPrivate]);
    console.log(transactionId, selectedClassId, userId);

    const handlePaymentResponse = useCallback(
        async (paramsObject) => {
            if (!transactionId) return;

            try {
                const response = await requests.post(`${VNPAY_RESPONSE_PAYMENT_URL}/${transactionId}`, paramsObject);
                localStorage.removeItem('transactionId');
                localStorage.removeItem('selectedClassId');
                if (response.data === true) {
                    await requests.put(`${STUDENT_BROWSERCLASS_URL}?classId=${selectedClassId}&action=true`);
                    await requestPrivate.post(`${CONVERSATION_URL}?userId=${userId}`);
                    await requestPrivate.post(CREATE_NOTIFICATION_URL, {
                        title: `${avatar.fullName} has accepted your class.`,
                        description: 'Follow them and start your lesson!',
                        url: '/classTutor',
                        accountId: userId,
                    });
                    fetchClasses();
                } else {
                    console.error('Payment was not successful:', response.data);
                }
            } catch (err) {
                console.error('Error during payment response handling:', err);
            } finally {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        },
        [transactionId, userId, avatar.fullName, fetchClasses, requestPrivate]
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramsObject = Object.fromEntries(urlParams.entries());
        handlePaymentResponse(paramsObject);
    }, [handlePaymentResponse]);

    const fetchClassesDetail = useCallback(
        async (classID) => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`);
                setCalendar(response.data.calenders);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        },
        [requestPrivate]
    );

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
    console.log(selectedClass);
    const handleComplaint = () => {
        setComplaint(true);
    };

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
                            <option value="Cancled Class">Cancled Class</option>
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
                                        <Calendar events={calendar} urlClass={selectedClass.urlClass} isApprove={filterParams.isApprove} status={filterParams.status} />
                                    </Row>

                                    <Row>
                                        {filterParams.status === null && filterParams.isApprove === null ? (
                                            <div className={cx('container_avatar-buttons')}>
                                                <button className={cx('container_avatar-button', 'reject')}
                                                    onClick={handleCancle}>
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
                            <Row className={cx('complaint')}>
                                <Button
                                    to="/viewComplaint"
                                    state={{ classID }}
                                    orange
                                    className={cx('container__viewComplaint')}
                                >
                                    View Complaint
                                </Button>
                                {filterParams.isApprove && filterParams.status === null && (
                                    <Button
                                        onClick={handleComplaint}
                                        transparent
                                        className={cx('container__complaint')}
                                    >
                                        Complaint
                                    </Button>
                                )}

                                {complaint && <Complaint classId={classID} />}
                            </Row>
                        </Col>
                    ) : (
                        <div className={cx('container__noclass')}>
                            <span>There are currently no classes available.</span>
                        </div>
                    )}
                </Row>
            </Container>

            {/* Payment Modal */}
            <PaymentModal
                show={showPaymentModal}
                onHide={() => setShowPaymentModal(false)}
                onSelectPaymentMethod={handleSelectPaymentMethod}
                vnpayIMG={vnpayIMG}
                momoIMG={momoIMG}
            />
        </div>
    );
};

export default Classes;
