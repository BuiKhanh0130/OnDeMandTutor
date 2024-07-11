import React from 'react';
import classNames from 'classnames/bind';
import styles from './Popup.module.scss';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);
const TUTOR_BROWSER_FORM_URL = 'FormRequestTutor/tutorBrowserForm';
const CREATE_CLASS_URL = 'Classes/createClass';
const CREATE_NOTIFICATION_URL = 'Notification/createNotification'

const Popup = ({ setShowModal, modalContent, selected, form, sameFormNum, onActionComplete }) => {
    const requestPrivate = useRequestsPrivate();

    const handleConfirm = async () => {
        if (selected === 'Apply') {
            const BrowserForm = async () => {
                try {
                    await requestPrivate.put(`${TUTOR_BROWSER_FORM_URL}?formId=${form.formId}&action=true`);
                } catch (error) {
                    console.log(error);
                }
            };

            const CreateNotification = async () => {
                const param = {
                    title: `${form.fullName} created has created a new class for you on OnDemand Tutor.`,
                    description: 'complete the formalities to join your class!',
                    url: '/classes',
                    accountId: form.userIdStudent
                }
                try {
                     await requestPrivate.post(CREATE_NOTIFICATION_URL, param);
                 
                } catch (error) {
                    console.log(error);
                }
            }

            const CreateClass = async () => {
                const params = {
                    className: form.subjectName,
                    formId: form.formId,
                    description: form.description
                };

                try {
                    await requestPrivate.post(CREATE_CLASS_URL, params, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    alert("Create class successfully!!");
                } catch (error) {
                    console.log(error);
                }
            };

            await BrowserForm();
            await CreateClass();
            await CreateNotification();
        } else {
            const BrowserForm = async () => {
                try {
                    const response = await requestPrivate.put(`${TUTOR_BROWSER_FORM_URL}?formId=${form.formId}&action=false`);
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            await BrowserForm();
        }
        setShowModal(false);
        onActionComplete(); 
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal_icon')}>
                    <i className="bi bi-exclamation-circle"></i>
                </div>
                <p>{modalContent}</p>
                
                {(sameFormNum !== 0 && selected === 'Apply') && (
                    <div className={cx('modal-same-form')}>
                        <p>If you apply this form, it will simultaneously reject {sameFormNum} similar forms.</p>
                    </div>
                )}
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
};

export default Popup;
