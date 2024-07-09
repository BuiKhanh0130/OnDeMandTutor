import React, { useEffect, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '~/components/Search';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Calendar from '~/components/Calendar/Calendar';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'Classes/student/viewClassList';
const VIEW_CLASS_DETAILS_URL = 'Classes/viewClassDetail';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [filterParams, setFilterParams] = useState({ status: null, isApprove: true });
    const requestPrivate = useRequestsPrivate();

    const fetchClassesDetail = useCallback(async (classID) => {
        try {
            const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`);
            setCalendar(response.data.calenders);
            console.log(response.data.calenders);
        } catch (error) {
            console.log(error);
        }
    }, [requestPrivate]);

    useEffect(() => {
        if (classID) {
            fetchClassesDetail(classID);
        }
    }, [classID, fetchClassesDetail]);

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

    useEffect(() => {
        const fetchClasses = async () => {
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
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClasses();
    }, [filterParams, requestPrivate]);

    const handleClassClick = (classid) => {
        setClassID(classid);
    };

    const selectedClass = useMemo(() => classes.find(classs => classs.classid === classID), [classes, classID]);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="12" className={cx('container__search')}>
                        <div>
                            <Search />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className={cx('container__filter')}>
                        <select onChange={e => handleChangeSelect(e.target.value)}>
                            <option value="In Process">In Process</option>
                            <option value="NotComplete">Unpaid Class</option>
                            <option value="Well Done">Well Done</option>
                        </select>
                        <span>{size} Classes</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4" className={cx('container__class')}>
                        {classes.map((classs, index) => (
                            <Col key={index} lg="12" className={cx('container__class_detail')} onClick={() => handleClassClick(classs.classid)}>
                                <div className={cx('container__class-header')}>
                                    <span>{classs.className}</span>
                                </div>
                                <div className={cx('container__class-body')}>
                                    <span>Subject: {classs.subjectName}</span>
                                </div>
                            </Col>
                        ))}
                    </Col>
                    {selectedClass ? (
                        <Col lg='8' className={cx('container__mess_detail')}>
                            <Row>
                                <Col lg='12' className={cx('container__mess_header')}>
                                    <Row>
                                        <div className={cx('class_header')}>
                                            <img alt="react" src={selectedClass.studentAvatar}></img>
                                            <span>{selectedClass.tutorName}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className={cx('class_name')}>
                                            <span>{selectedClass.className}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Calendar events={calendar}/>
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
