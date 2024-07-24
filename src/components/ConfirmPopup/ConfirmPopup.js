import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmPopup = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Attendance</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to check attendance?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmPopup;
