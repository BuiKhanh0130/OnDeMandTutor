import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Form from './components/Form';
import Introduction from './components/Introduction';

import styles from './RequestTutor.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function RequestTutor() {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Form setShowModal={setShowModal} />
                <Introduction />

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your request has been sent successfully!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    );
}

export default RequestTutor;
