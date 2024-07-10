import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { ModalContext } from '~/components/ModalProvider';

import styles from './AllContact.module.scss';

const USERS = 'ConversationAccount';

const cx = classNames.bind(styles);

function AllContact() {
    const { conn, messages, roomId, setRoomId, setConnection, setMessage, setAvatarMessage } = useContext(ModalContext);
    const useRequestPrivate = useRequestsPrivate();
    const errRef = useRef();
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getAllUsers = async () => {
            try {
                const response = await useRequestPrivate.get(USERS, {
                    signal: controller.signal,
                });
                isMounted && setRooms(response.data);
            } catch (error) {
                setError(error);
            }
        };

        getAllUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [useRequestPrivate]);

    const joinChatRoom = async (username, chatRoom) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl('https://localhost:7262/chatHub')
                .configureLogging(LogLevel.Information)
                .build();

            conn.on('JoinSpecificChatRoom', (username, msg) => {
                console.log('msg: ', msg);
            });

            conn.on('ReceiveSpecificMessage', (username, msg) => {
                setMessage((messages) => [...messages, { msg }]);
                console.log(messages);
            });

            await conn.start();
            await conn.invoke('JoinSpecificChatRoom', { username, chatRoom });

            setConnection(conn);
        } catch (e) {
            console.log(e);
        }
    };

    const stopChatRoom = async () => {
        await conn.stop();
        setConnection('');
    };

    return (
        <Col lg="4" className={cx('wrapper')}>
            <p ref={errRef} className={error ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {error}
            </p>
            <Row className={cx('container_user-item')}>
                {rooms.length > 0 &&
                    rooms.map((user) => {
                        return (
                            <Col
                                key={user.conversationId}
                                lg="12"
                                className={cx('container_user_detail', { active: user.conversationId === roomId })}
                                onClick={() => {
                                    setRoomId(user.conversationId);
                                    setMessage([]);
                                    conn && stopChatRoom();
                                    joinChatRoom(user.name, user.conversationId);
                                    setAvatarMessage({ avatar: user.avatar, name: user.name });
                                }}
                            >
                                <img alt="react" src={user.avatar}></img>
                                <Row className={cx('user_item')}>
                                    <Col className={cx('content-left')}>
                                        <span className={cx('content-left-user')}>{user.name}</span>
                                        <span className={cx('content-left-lastMessage')}>{user.lastMessage}</span>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
            </Row>
        </Col>
    );
}

export default AllContact;
