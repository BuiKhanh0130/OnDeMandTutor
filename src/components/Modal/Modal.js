import classNames from 'classnames/bind';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

export function ModalConfirm({ handleCancel, handleConfirm, content }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal_icon')}>
                    <i className="bi bi-exclamation-circle"></i>
                </div>

                <div className={cx('modal-same-form')}>
                    <p>{content}</p>
                </div>

                <div className={cx('modal-buttons')}>
                    <button className={cx('modal-button', 'cancel')} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={cx('modal-button', 'confirm')} onClick={handleConfirm}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ModalNotConfirm({ showModal, handleCancel, content, typeError }) {
    return (
        <Modal show={showModal} onClick={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{typeError}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
