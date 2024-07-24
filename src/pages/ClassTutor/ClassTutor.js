import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames/bind';
import styles from './ClassTutor.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import CalendarClass from '~/components/CalendarClass/CalendarClass';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import Complaint from '../Complaint';
import UpdateUrl from './components/UpdateUrl';
import { ModalNotConfirm } from '~/components/Modal';
import ConfirmPopup from '~/components/ConfirmPopup/ConfirmPopup';
import requests from '~/utils/request';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'class/get_tutor-classes';
const VIEW_CLASS_DETAILS_URL = 'class/get_class-detail';
const END_CLASS_URL = 'class/submit_class';
const NOTIFICATION_URL = 'notification/create_notification';
const UPDATE_CLASS_URL = 'class/update_class-url/';
const CHECK_ATTENDENCE_URL = 'class/student_checking-day'

const ClassTutor = () => {
    const { complaint, setComplaint } = useContext(ModalContext);
    const accessToken = sessionStorage.getItem('accessToken');
    const user = jwtDecode(accessToken);
    const requestPrivate = useRequestsPrivate();
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true });
    const [dateEnd, setDateEnd] = useState();
    const [subject, setSubject] = useState();
    const [userId, setUserId] = useState();
    const [urlClass, setUrlClass] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState('');
    const [typeOfNoti, setTypeOfNoti] = useState('');
    const [updateUrl, setUpdateUrl] = useState(false);
    const [contentUrl, setContentUrl] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [calendarId, setCalendarId] = useState('');

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
            console.log(response.data.listResult);
            setClasses(response.data.listResult);
            setSize(response.data.listResult.length);
            if (response.data.listResult.length > 0) {
                setClassID(response.data.listResult[0].classid);
                setDateEnd(response.data.listResult[0].dayEnd);
                setSubject(response.data.listResult[0].subjectName);
                setUserId(response.data.listResult[0].userId);
                setUrlClass(response.data.listResult[0].urlClass);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, [filterParams, requestPrivate, showModal]);

    const fetchClassesDetail = useCallback(
        async (classID) => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`);
                setCalendar(response.data.calenders);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        },
        [requestPrivate],
    );

    useEffect(() => {
        if (classID) {
            fetchClassesDetail(classID);
        }
    }, [classID, fetchClassesDetail]);

    const handleUpdateClassUrl = async () => {
        if (contentUrl === '') {
            setShowNotification('Please fill new url!');
            setTypeOfNoti('Warning');
            setShowModal(true);
            return;
        }
        const response = await requestPrivate.put(`${UPDATE_CLASS_URL}${classID}?newUrl=${contentUrl}`);
        if (response.status === 200) {
            handleHiddenUpdateUrl();
            setShowNotification('Update successfully!');
            setTypeOfNoti('Success');
            setShowModal(true);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    const handleClassClick = (classs) => {
        console.log(classs);
        setSubject(classs.subjectName);
        setDateEnd(classs.dayEnd);
        setUserId(classs.userId);
        setClassID(classs.classid);
        fetchClassesDetail(classs.classid);
        setUrlClass(classs.urlClass);
    };

    const handleClass = async () => {
        const response = await requestPrivate.put(`${END_CLASS_URL}/${classID}`);
        if (response.status === 200) {
            setShowNotification('Class has been close. Thank for support this class!');
            setTypeOfNoti('Success');
            setShowModal(true);
            createNotification(userId);
        }
    };

    const createNotification = async () => {
        try {
            const response = await requestPrivate.post(
                NOTIFICATION_URL,
                JSON.stringify({
                    title: `The class ${subject} has been ended`,
                    description: `please fill feedback for me`,
                    url: `/feedback/${user.UserId}/${classID}`,
                    accountId: userId,
                }),
            );
            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const selectedClass = useMemo(() => classes.find((classs) => classs.classid === classID), [classes, classID]);

    const handleComplaint = () => {
        setComplaint(true);
    };

    const checkExpire = (endDate) => {
        const inPutDate = new Date(endDate);
        const currentDate = new Date();
        return inPutDate > currentDate;
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateUrl = () => {
        setUpdateUrl(true);
    };

    const handleHiddenUpdateUrl = () => {
        setContentUrl('');
        setUpdateUrl(false);
    };

    const handleChangeNewUrl = (e) => {
        if (e.target.value === ' ') {
            return;
        }
        setContentUrl(e.target.value);
    };

    const handleConfirmAttendance = () => {
        const handleAttendanceChange = async () => {
            try {
                await requests.put(`${CHECK_ATTENDENCE_URL}?calenderId=${calendarId}`);
                setPopUp(false);
            } catch (error) {
                console.error(`Error updating attendance`, error);
            }
        }
        handleAttendanceChange();
        setPopUp(false);
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="12" className={cx('container__title')}>
                        <h1>Tutor Classes</h1>
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
                                        <CalendarClass events={calendar} setModal={setPopUp} setCalendarId={setCalendarId} />
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={cx('complaint')}>
                                {checkExpire(dateEnd) && filterParams.isApprove && filterParams.status === null && (
                                    <Button orange className={cx('container__endClass')} onClick={handleClass}>
                                        End Class
                                    </Button>
                                )}
                                <Button onClick={handleUpdateUrl} orange className={cx('container__viewComplaint')}>
                                    New Link Class
                                </Button>
                                <Button
                                    to="/viewComplaint"
                                    state={{ classID, syntax: 'tutor' }}
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

                                {complaint && <Complaint classId={classID} syntax={'tutor'} />}
                            </Row>
                        </Col>
                    ) : (
                        <div className={cx('container__noclass')}>
                            <span>There are currently no classes available.</span>
                        </div>
                    )}
                </Row>
                {updateUrl && (
                    <UpdateUrl
                        contentUrl={contentUrl}
                        onHide={handleHiddenUpdateUrl}
                        handleUpdateClassUrl={handleUpdateClassUrl}
                        handleChangeNewUrl={handleChangeNewUrl}
                    ></UpdateUrl>
                )}

                <ModalNotConfirm
                    showModal={showModal}
                    handleCancel={handleCloseModal}
                    content={showNotification}
                    typeError={typeOfNoti}
                />

                {popUp && (
                    <ConfirmPopup
                        show={popUp}
                        onHide={() => setPopUp(false)}
                        onConfirm={handleConfirmAttendance}
                    />
                )}
            </Container>
        </div>
    );
};

export default ClassTutor;
