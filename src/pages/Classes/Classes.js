import React, { useEffect, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Calendar from '~/components/Calendar/Calendar';
import Image from '~/components/Image';
import images from '~/assets/images';
import requests from '~/utils/request';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'Classes/student/viewClassList';
const VIEW_CLASS_DETAILS_URL = 'Classes/viewClassDetail';
const STUDENT_BROWSERCLASS_URL = 'Classes/student/browseClass';
const REQUEST_PAYMENT_URL = 'VnPay/create_payment_url';
const RESPONSE_PAYMENT_URL = 'VnPay/payment_return';
const WALLETID_ADMIN = '1bada450-d90c-4e14-b410-21ab37f00091';
const VNPAYID = 'ce5ebcf3-d4fb-49a7-bca6-1ce10dd76d3f';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true });
    const [message, setMessage] = useState('Vuilongthanhtoan');
    const [paymentId, setPaymentId] = useState(localStorage.getItem('paymentid'));
    const [price, setPrice] = useState(200000);

    const requestPrivate = useRequestsPrivate();

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
                description: encodeURIComponent(message)
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
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, [filterParams, requestPrivate]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramsObject = {};

        for (const [key, value] of urlParams.entries()) {
            paramsObject[key] = value;
        }

        const responsePayment = async () => {
            if (!paymentId) {
                return;
            }

            const browserClass = async () => {
                try {
                    await requests.put(`${STUDENT_BROWSERCLASS_URL}?classId=${classID}&action=true`);
                    fetchClasses();
                } catch (err) {
                    console.error('Error during browser class:', err);
                }
            }

            try {
                const response = await requests.post(`${RESPONSE_PAYMENT_URL}/${paymentId}`, paramsObject);
                localStorage.removeItem('paymentid');
                if (response.data === '00') {
                    browserClass();
                } else {
                    console.error('Payment was not successful:', response.data);
                }
            } catch (err) {
                console.error('Error during payment response handling:', err);
            }
        };

        responsePayment();
    }, [paymentId, classID, fetchClasses]);

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
    }, [fetchClasses]);

    const handleClassClick = (classs) => {
        setClassID(classs.classid);
        setPrice(classs.price);
        fetchClassesDetail(classs.classid); 
    };

    const selectedClass = useMemo(
        () => classes.find(classs => classs.classid === classID),
        [classes, classID]
    );

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
                        <select onChange={e => handleChangeSelect(e.target.value)}>
                            <option value="In Process">In Process</option>
                            <option value="NotComplete">Unpaid Class</option>
                            <option value="Well Done">Well Done</option>
                        </select>
                        <span>Total: {size}</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg='4' className={cx('container__class')}>
                        {classes.map((classs, index) => (
                            <div key={index} className={cx('container__class_detail')} onClick={() => handleClassClick(classs)}>
                                <div className={cx('container__class-header')}>
                                    <Image src={classs.avatar} alt={classs.subjectName} className={cx('class-avatar')} />
                                    <span>{classs.subjectName}</span>
                                </div>
                                <div className={cx('container__class-body')}>
                                    <p><strong>Created On:</strong> {classs.createday}</p>
                                    <p><strong>Start Date:</strong> {classs.dayStart}</p>
                                    <p><strong>End Date:</strong> {classs.dayEnd}</p>
                                    <p><strong>Description:</strong> {classs.description}</p>
                                    <p><strong>Price:</strong> {classs.price}</p>
                                </div>
                            </div>
                        ))}
                    </Col>
                    {selectedClass ? (
                        <Col lg='8' className={cx('container__mess_detail')}>
                            <Row>
                                <Col lg='12' className={cx('container__mess_header')}>
                                    <Row>
                                        <div className={cx('class_header')}>
                                            <Image src={images.avatarDefaultTutor || selectedClass.avatar} alt={selectedClass.subjectName} className={cx('class-avatar')} />
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
                                                <button className={cx('container_avatar-button', 'reject')}>
                                                    Reject
                                                </button>
                                                <button className={cx('container_avatar-button')} onClick={handlePayment}>
                                                    Apply
                                                </button>
                                            </div>
                                        ) : ''}
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
