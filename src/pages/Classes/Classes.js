import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '~/components/Search';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Calendar from '~/components/Calendar/Calendar';
import { Button } from 'bootstrap';

const cx = classNames.bind(styles);

const VIEW_CLASS_LIST_URL = 'Classes/student/viewClassList';
const VIEW_CLASS_DETAILS_URL = 'Classes/viewClassDetail';

const Classes = () => {
    const [filter, setFilter] = useState(true);
    const [classes, setClasses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [hour, setHour] = useState('');
    const [size, setSize] = useState(0);
    const [classID, setClassID] = useState('');
    const [paid, setPaid] = useState(true);
    const requestPrivate = useRequestsPrivate();

    useEffect(() => {
        const fetchClassesDetail = async () => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_DETAILS_URL}?classid=${classID}`);
                setCalendar(response.data.calenders);
                console.log(response.data.calenders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClassesDetail();
    }, [classID]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_LIST_URL}?status=${filter}&isApprove=true`);
                setClasses(response.data.listResult);
                setSize(response.data.listResult.length);
                setClassID(response.data.listResult[0].classid);
                console.log(response.data);
                console.log(
                    `${response.data[0].classCalenders[0].timeStart}h-${response.data[0].classCalenders[0].timeEnd}h`,
                );
                setHour(
                    `${response.data[0].classCalenders[0].timeStart}h - ${response.data[0].classCalenders[0].timeEnd}h`,
                );

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClasses();
    }, [filter, requestPrivate]);

    const firstClass = classes?.length > 0 ? classes[0] : null;

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
                        <select onChange={(e) => setFilter(e.target.value === 'true')}>
                            <option>Not Complete</option>
                            <option value={true}>In Process</option>
                            <option value={false}>Well Done</option>
                        </select>
                        <span>{size} Classes</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4" className={cx('container__class')}>
                        {classes?.map((classs, index) => (
                            <Col key={index} lg="12" className={cx('container__class_detail')}>
                                <div className={cx('container__class-header')}>
                                    <span>{classs?.className}</span>
                                </div>
                                <div className={cx('container__class-body')}>
                                    <span>Subject: {classs?.subjectName}</span>
                                </div>
                            </Col>
                        ))}
                    </Col>
                    {firstClass ? (
                        <Col lg="8" className={cx('container__mess_detail')}>
                            <Row>
                                <Col lg="12" className={cx('container__mess_header')}>
                                    <Row>
                                        <div className={cx('class_header')}>
                                            <img alt="react" src={firstClass?.studentAvatar}></img>
                                            <span>{firstClass?.tutorName}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className={cx('class_name')}>
                                            <span>{firstClass?.className}</span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Calendar events={calendar} />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <div className={cx('container__noclass')}>
                            <Row>
                                <Col lg="12" className={cx('container__mess_header')}>
                                    <img alt="react" src={firstClass?.studentAvatar}></img>
                                    <Row>
                                        <span>{firstClass?.tutorName}</span>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Classes;
