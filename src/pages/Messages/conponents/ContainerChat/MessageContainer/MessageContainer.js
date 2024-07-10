import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';

import Image from '~/components/Image';
import { ModalContext } from '~/components/ModalProvider';

import styles from './MessageContainer.module.scss';

const cx = classNames.bind(styles);

function MessageContainer({ allMsgs, messages }) {
    const { userId, avatarMessage } = useContext(ModalContext);
    return (
        <Col lg="12" className={cx('container__mess-chatbox')}>
            {allMsgs?.length > 0 &&
                allMsgs.map((allMsg, index) => {
                    return userId === allMsg.userId ? (
                        <div className={cx('container__mess-i')}>
                            <div className={cx('container__mess-i-item')}>
                                <span>{allMsg.content}</span>
                                <span>{allMsg.time}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('container__mess-guess')}>
                            <Image src={avatarMessage.avatar} alt={avatarMessage.fullName}></Image>
                            <div className={cx('container__mess-guess-item')}>
                                <span>{allMsg.content}</span>
                                <span>{allMsg.time}</span>
                            </div>
                        </div>
                    );
                })}
            {messages?.length > 0 &&
                messages.map((messages, index) => {
                    return userId === messages.msg.userId ? (
                        <div className={cx('container__mess-i')}>
                            <div className={cx('container__mess-i-item')}>
                                <span>{messages.msg.content}</span>
                                <span>{messages.msg.time}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('container__mess-guess')}>
                            <div className={cx('container__mess-guess-item')}>
                                <span>{messages.msg.content}</span>
                                <span>{messages.msg.time}</span>
                            </div>
                        </div>
                    );
                })}
        </Col>
    );
}

export default MessageContainer;
