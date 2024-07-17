import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './RequestOfStudent.module.scss';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);


function RequestOfStudent() {
    const [forms, setForms] = useState([]);
    const [limitPage, setLimitPage] = useState(0); 
    const [filter, setFilter] = useState('pending'); 
    const requestPrivate = useRequestsPrivate();

    const handleActionComplete = () => {
        let FORM_REQUEST_URL = 'FormRequestTutor/viewForm';

        if (filter === 'approved') {
            FORM_REQUEST_URL += '?status=true';
        }
        if (filter === 'rejected') {
            FORM_REQUEST_URL += '?status=false';
        }
        const fetchForm = async () => {
            try {
                const response = await requestPrivate.get(FORM_REQUEST_URL);
                setForms(response.data.listResult);
                setLimitPage(response.data.limitPage);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchForm();
    };

    useEffect(() => {
        handleActionComplete();
    }, [filter, requestPrivate]);

    

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <header className={cx('header')}>
                    <h1>Your Requests</h1>
                </header>
                <div className={cx('filter-buttons')}>
                    <button className={cx({ active: filter === 'pending' })} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={cx({ active: filter === 'approved' })} onClick={() => setFilter('approved')}>Approved</button>
                    <button className={cx({ active: filter === 'rejected' })} onClick={() => setFilter('rejected')}>Rejected</button>
                </div>
                {forms[0] ? forms.map((form, index) => {
                    return (
                        <Row key={index} className={cx('container__hero')}>
                            <Col lg="8" className={cx('container__card')}>
                                <div className={cx('container__form-control')}>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Subject:</strong>
                                        <span>{form.subjectName}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Created On:</strong>
                                        <span>{form.createDay}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Start Date:</strong>
                                        <span>{form.dayStart}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>End Date:</strong>
                                        <span>{form.dayEnd}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Days of Week:</strong>
                                        <span>{form.dayOfWeek}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Time:</strong>
                                        <span>{form.timeStart} - {form.timeEnd}</span>
                                    </div>
                                    <div className={cx('container__form-control-info')}>
                                        <strong>Description:</strong>
                                        <span>{form.description}</span>
                                    </div>
                                </div>
                            </Col>

                            <Col lg="4" className={cx('container_avatar')}>
                                <Image src={form.avatar || images.avatarDefault} alt={form.fullName} />
                                <p>{form.fullName}</p>
                            </Col>
                        </Row>
                    );
                }) : (<div className={cx('container_norequest')}>
                            <span>There are currently no request available.</span>
                </div>) }
            </Container>

        </div>
    );
}

export default RequestOfStudent;


