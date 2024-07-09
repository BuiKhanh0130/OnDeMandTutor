import React from 'react'
import classNames from 'classnames/bind' 
import styles from './Popup.module.scss'
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles)
const TUTOR_BROWSER_FORM_URL = 'FormRequestTutor/tutorBrowserForm'


const Popup = ({setShowModal, modalContent, selected, form, sameFormNum}) => {

    const requestPrivate = useRequestsPrivate();

    const handleConfirm = () => {
        if (selected === 'Apply') {
            const BrowserForm = async () => {
                try {
                    const response = await requestPrivate.put(`${TUTOR_BROWSER_FORM_URL}?formId=${form.formId}&action=true`);
                } catch (error) {
                    console.log(error);
                }
            }
            BrowserForm();



        }else{
            const BrowserForm = async () => {
                try {
                    const response = await requestPrivate.put(`${TUTOR_BROWSER_FORM_URL}?formId=${form.formId}&action=false`);
                    console.log(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
            BrowserForm();
        }
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
                
                {(sameFormNum !== 0 && selected === 'Apply') && (
                    <div className={cx('modal-same-form')}>
                        <p>If you apply this form, it will simultaneously reject {sameFormNum} similar forms.</p>
                    </div>)}
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