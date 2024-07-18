import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ handleCancel, handleConfirm, content }) {
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

export default Modal;
