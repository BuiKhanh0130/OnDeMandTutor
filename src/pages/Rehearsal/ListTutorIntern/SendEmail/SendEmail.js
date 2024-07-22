import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import { CloseIcon, SendIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import ModalNotification from '~/components/ModalNotification';

import styles from './SendEmail.module.scss';

const cx = classNames.bind(styles);

const SEND_EMAIL_URl = 'moderator/create_email';

function SendEmail() {
    const { email, tutorId, setSendEmail } = useContext(ModalContext);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState();
    const [hours, setHours] = useState();
    const requestPrivate = useRequestsPrivate();

    const handleSendEmail = async () => {
        const inputDateObj = new Date(date);
        const currentDate = new Date();
        if (date === null) {
            setError('Please fill all input!');
            setShowModal(true);
            return;
        } else if (currentDate > inputDateObj) {
            setError('Date interview must be greater than current date!');
            setShowModal(true);
            return;
        } else if (hours < 6 || hours > 24) {
            setError('Please fill hour valid!');
            setShowModal(true);
            return;
        }
        console.log(
            JSON.stringify({
                historyTutorApplyId: 'string',
                dateInterView: `${date}T${hours}:00.000z`,
                content,
                tutorId,
                email,
            }),
        );
        const response = await requestPrivate.put(
            SEND_EMAIL_URl,
            JSON.stringify({
                historyTutorApplyId: 'string',
                dateInterView: `${date}T${hours}:00.000Z`,
                content,
                tutorId,
                email,
            }),
        );
        if (response.status === 200) {
            setError('Send email successfully!');
            setShowModal(true);
        }
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const handleClose = () => {
        setSendEmail(false);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handleHour = (e) => {
        setHours(e.target.value);
    };

    const handleCloseModal = (e) => {
        setShowModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3>New letter</h3>
                <div className={cx('container__to')}>
                    <div className={cx('container__to-email')}> {email}</div>
                </div>
                <div className={cx('container__to')}>
                    <input type="date" placeholder="Date to interview" id="date" onChange={handleDate}></input>
                </div>
                <div className={cx('container__time')}>
                    <input type="time" placeholder="hour" id="hour" onChange={handleHour}></input>
                </div>
                <div className={cx('container__content')} onChange={handleContent}>
                    <textarea id="my-textarea" rows="5" cols="30" placeholder="Enter your text here..."></textarea>
                </div>
                <div className={cx('container__close')} onClick={handleClose}>
                    <CloseIcon />
                </div>
                <div className={cx('container__send')} onClick={handleSendEmail}>
                    <SendIcon></SendIcon>
                </div>
            </div>
            <ModalNotification
                showModal={showModal}
                error={error}
                handleCloseModal={handleCloseModal}
            ></ModalNotification>
        </div>
    );
}

export default SendEmail;
