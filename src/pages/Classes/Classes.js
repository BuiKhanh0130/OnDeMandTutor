import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Classes.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '~/components/Search';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);

const VIEW_CLASS_URL = 'Classes/student/viewClass';

const Classes = () => {
    const [filter, setFilter] = useState(true);
    const [classes, setClasses] = useState([]);
    const [size, setSize] = useState(0);
    const requestPrivate = useRequestsPrivate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await requestPrivate.get(`${VIEW_CLASS_URL}?action=${filter}`);
                setClasses(response.data);
                setSize(response.data.length);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClasses();
    }, [filter, requestPrivate]);

    const firstClass = classes.length > 0 ? classes[0] : null;

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
                        <select onChange={e => setFilter(e.target.value === 'true')}>
                            <option value={true}>In Process</option>
                            <option value={false}>Well Done</option>
                        </select>
                        <span>{size} Classes</span>
                    </Col>
                </Row>
                <Row>
                    <Col lg='4' className={cx('container__class')}>
                        {classes.map((classs, index) => (
                            <Col key={index} lg="12" className={cx('container__class_detail')}>
                                <div className={cx('container__class-header')}>
                                    <span>{classs.className}</span>
                                </div>
                                <div className={cx('container__class-body')}>
                                    <span>Subject: {classs.subjectName}</span> 
                                </div>
                            </Col>
                        ))}
                    </Col>
                    {firstClass ? (
                        <Col lg='8' className={cx('container__mess_detail')}>
                        <Row>
                           
                                <Col lg='12' className={cx('container__mess_header')}>
                                    <img alt="react" src={firstClass.studentAvatar}></img>
                                    <Row>
                                        <span>{firstClass.tutorName}</span>
                                    </Row>
                                </Col>
                        </Row>
                    </Col>) : (<div className={cx('container__noclass')}>
                        <span>There are currently no classes available.</span>
                    </div> )}
                </Row>
            </Container>
        </div>
    );
};

export default Classes;