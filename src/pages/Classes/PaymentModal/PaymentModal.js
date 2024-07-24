import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Image from '~/components/Image';
import styles from './PaymentModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PaymentModal = ({ show, onHide, onSelectPaymentMethod, vnpayIMG, momoIMG }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Payment Method</Modal.Title>
            </Modal.Header>
            <Modal.Body className={cx('modal-body')}>
                <div className={cx('payment-option')} onClick={() => onSelectPaymentMethod('VNPAY')}>
                    <Image src={vnpayIMG} alt="VNPAY" className={cx('payment-image')} />
                    <span>VNPAY</span>
                </div>
                <div className={cx('payment-option')} onClick={() => onSelectPaymentMethod('MOMO')}>
                    <Image src={momoIMG} alt="MOMO" className={cx('payment-image')} />
                    <span>MOMO</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
