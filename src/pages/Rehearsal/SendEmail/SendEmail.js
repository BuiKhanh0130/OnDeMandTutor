import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import { CloseIcon, SendIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './SendEmail.module.scss';

const cx = classNames.bind(styles);

const SEND_EMAIL_URl = 'Moderators/SendEmailInterTutor';

function SendEmail() {
    const { setSendEmail } = useContext(ModalContext);
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const requestPrivate = useRequestsPrivate();

    const handleSendEmail = async () => {
        console.log(email, content);
        const response = await requestPrivate.get(`${SEND_EMAIL_URl}?email=${email}&content=${content}`);
        console.log(response.status);
    };

    const handleEnter = () => {};

    const handleTo = (e) => {
        setEmail(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const handleClose = () => {
        setSendEmail(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3>New letter</h3>
                <div className={cx('container__to')}>
                    <input
                        type="text"
                        placeholder="To"
                        id="email"
                        className={cx('container__to-email')}
                        onChange={handleTo}
                    ></input>
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
        </div>
    );
}

export default SendEmail;
