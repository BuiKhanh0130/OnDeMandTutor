import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './RequestOfTutor.module.scss';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Popup from './Popup';

const cx = classNames.bind(styles);

const HANDLE_FORM_URL = 'formrequesttutor/handle_browserform';

function RequestOfTutor() {
    const [forms, setForms] = useState([]);
    const [limitPage, setLimitPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [form, setForm] = useState(null);
    const [selected, setSelected] = useState('');
    const [sameFormNum, setSameFormNum] = useState(0);
    const [filter, setFilter] = useState('pending');
    const requestPrivate = useRequestsPrivate();

    const handleActionComplete = () => {
        let FORM_REQUEST_URL = 'formrequesttutor/get_form';

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

    const handleReject = (form) => {
        setSelected('Reject');
        setForm(form);
        setModalContent('Are you sure you want to reject this request?');
        setShowModal(true);
    };

    const handleApply = (form) => {
        setSelected('Apply');
        setForm(form);
        setModalContent('Are you sure you want to apply for this request?');
        setShowModal(true);

        const fetchSameForm = async () => {
            try {
                const response = await requestPrivate.get(`${HANDLE_FORM_URL}?formId=${form.formId}&action=true`);
                setSameFormNum(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSameForm();
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <header className={cx('header')}>
                    <h1>Your Students' Requests</h1>
                    <p>Discover, connect with potential students, and share your passion for learning.</p>
                </header>
                <div className={cx('filter-buttons')}>
                    <button className={cx({ active: filter === 'pending' })} onClick={() => setFilter('pending')}>
                        Pending
                    </button>
                    <button className={cx({ active: filter === 'approved' })} onClick={() => setFilter('approved')}>
                        Approved
                    </button>
                    <button className={cx({ active: filter === 'rejected' })} onClick={() => setFilter('rejected')}>
                        Rejected
                    </button>
                </div>
                {forms[0] ? (
                    forms.map((form, index) => {
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
                                            <span>
                                                {form.timeStart} - {form.timeEnd}
                                            </span>
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
                                    {filter === 'pending' ? (
                                        <div className={cx('container_avatar-buttons')}>
                                            <button
                                                className={cx('container_avatar-button', 'reject')}
                                                onClick={() => handleReject(form)}
                                            >
                                                Reject
                                            </button>
                                            <button
                                                className={cx('container_avatar-button')}
                                                onClick={() => handleApply(form)}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </Col>
                            </Row>
                        );
                    })
                ) : (
                    <div className={cx('container_norequest')}>
                        <span>There are currently no request available.</span>
                    </div>
                )}
            </Container>

            {showModal && (
                <Popup
                    setShowModal={setShowModal}
                    modalContent={modalContent}
                    selected={selected}
                    form={form}
                    sameFormNum={sameFormNum}
                    onActionComplete={handleActionComplete}
                />
            )}
        </div>
    );
}

export default RequestOfTutor;
