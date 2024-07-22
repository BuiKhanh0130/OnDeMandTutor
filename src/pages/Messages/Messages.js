import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';

import styles from './Messages.module.scss';
import AllContact from './conponents/AllContact';
import { ModalContext } from '~/components/ModalProvider';
import ContainerChat from './conponents/ContainerChat';
import Header from '~/layouts/components/Header';
import HeaderTutor from '~/layouts/Tutor/components/HeaderTutor';

const cx = classNames.bind(styles);

const Messages = () => {
    const { roomId, conn, auth } = useContext(ModalContext);
    const Layer = auth.role === 'Tutor' ? HeaderTutor : Header;
    const sendMessage = async (message) => {
        try {
            await conn.invoke('SendMessage', message);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Layer />
            <Container className={cx('container')}>
                <span className={cx('container__msg')}>Messages</span>
                <Row>
                    <AllContact />
                    {roomId && <ContainerChat sendMessage={sendMessage} />}
                </Row>
            </Container>
        </div>
    );
};

export default Messages;
