import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';

import styles from './Messages.module.scss';
import AllContact from './conponents/AllContact';
import { ModalContext } from '~/components/ModalProvider';
import ContainerChat from './conponents/ContainerChat';
import CreateClass from '~/pages/PopUp/Class';
import Header from '~/layouts/components/Header';

const cx = classNames.bind(styles);

const Messages = () => {
    const { createClass, roomId, conn } = useContext(ModalContext);

    const sendMessage = async (message) => {
        try {
            await conn.invoke('SendMessage', message);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Container className={cx('container')}>
                <span className={cx('container__msg')}>Messages</span>
                <Row>
                    <AllContact />
                    {roomId && <ContainerChat sendMessage={sendMessage} />}
                    {createClass && <CreateClass />}
                </Row>
            </Container>
        </div>
    );
};

export default Messages;
