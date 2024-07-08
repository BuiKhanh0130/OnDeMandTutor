import React from 'react'
import classNames from 'classnames/bind' 
import styles from './Popup.module.scss'

const cx = classNames.bind(styles)

const Popup = ({setShowModal, modalContent}) => {


    const handleConfirm = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };
  return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal_icon')}>
                    <i class="bi bi-exclamation-circle"></i>
                </div>
                <p>{modalContent}</p>
                <div className={cx('modal-buttons')}>
                    <button className={cx('modal-button', 'cancel')} onClick={handleCancel}>
                        Cancle
                    </button>
                    <button className={cx('modal-button', 'confirm')} onClick={handleConfirm}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Popup