import { useState } from 'react';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import Button from '~/components/Button';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Introduction from '../RequestTutor/components/Introduction';

import styles from './GenerateClass.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const GENERATE_CLASS_URL = 'class/create_class';

function CreateClass() {
    const navigate = useNavigate();
    const requestPrivates = useRequestsPrivate();
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleGenerateClass = async () => {
        const url = window.location.href;
        console.log(url);
        console.log(url.split('/'));
        const formId = url.split('/')[4];

        console.log(JSON.stringify({ className, description, formId }));
        const response = await requestPrivates.post(
            GENERATE_CLASS_URL,
            JSON.stringify({ className, description, formId }),
        );

        if (response.status === 200) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/classTutor');
            }, 5000);
        }
    };
    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="8" className={cx('class__container')}>
                    <div className={cx('form')}>
                        <div className={cx('tutor__subject')}>
                            <label id="className">Name class</label>
                            <input type="text" id="className" onChange={(e) => setClassName(e.target.value)}></input>
                        </div>
                        <div className={cx('tutor__grade')}>
                            <textarea
                                type="text"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <Button className={cx('submit')} onClick={handleGenerateClass}>
                            Submit
                        </Button>
                    </div>
                </Col>
                <Introduction />
            </Row>
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Create class successfully!</Modal.Body>
            </Modal>
        </Container>
    );
}

export default CreateClass;
