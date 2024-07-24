import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
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

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'class/get_tutor-classes';
const VIEW_CLASS_DETAILS_URL = 'class/get_class-detail';

const Classes = () => {
    const { complaint, setComplaint } = useContext(ModalContext);
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true });

    const requestPrivate = useRequestsPrivate();

    console.log(classes);

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
            setClasses(response.data.listResult);
            console.log(response.data.listResult);
            setSize(response.data.listResult.length);
            if (response.data.listResult.length > 0) {
                setClassID(response.data.listResult[0].classid);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    }, [filterParams, requestPrivate]);

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

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    const handleClassClick = (classs) => {
        setClassID(classs.classid);
        fetchClassesDetail(classs.classid);
    };

    const selectedClass = useMemo(() => classes.find((classs) => classs.classid === classID), [classes, classID]);

    const handleComplaint = () => {
        setComplaint(true);
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
                                        <CalendarClass events={calendar} />
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
                                <Button onClick={handleComplaint} transparent className={cx('container__complaint')}>
                                    Complaint
                                </Button>
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
        </div>
    );
};

export default Classes;
