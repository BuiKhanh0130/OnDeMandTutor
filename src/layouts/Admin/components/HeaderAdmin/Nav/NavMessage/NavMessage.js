import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import { useContext, useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import Popper from '~/components/Popper';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './NavMessage.module.scss';

const cx = classNames.bind(styles);

const USERS = 'conversation-account';

function NavMessage() {
    const { conn, messages, setRoomId, setConnection, setMessage, setAvatarMessage } = useContext(ModalContext);
    const useRequestPrivate = useRequestsPrivate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getAllUsers = async () => {
            try {
                const response = await useRequestPrivate.get(USERS, {
                    signal: controller.signal,
                });
                isMounted && setUsers(response.data);
            } catch (error) {
                console.log(error);
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
        <HeadlessTippy
            interactive
            placement="bottom-end"
            className={cx('nav-item', 'dropdown')}
            render={(attrs) => (
                <Popper>
                    <ul className={cx('messages')}>
                        <li className={cx('dropdown-header')}>
                            You have {users.length} messages
                            <Link to="/messages">
                                <span className={cx('badge rounded-pill bg-primary p-2 ms-2')}>View all</span>
                            </Link>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        {users.map((user, index) => {
                            return (
                                <li className={cx('message-item')}>
                                    <Link
                                        to={'/messages'}
                                        onClick={() => {
                                            setRoomId(user.conversationId);
                                            setMessage([]);
                                            conn && stopChatRoom();
                                            joinChatRoom(user.name, user.conversationId);
                                            setAvatarMessage({ avatar: user.avatar, name: user.name });
                                        }}
                                    >
                                        <img src={user.avatar} alt={user.name} className={cx('rounded-circle')}></img>
                                        <div>
                                            <h4>{user?.name}</h4>
                                            <p>{user?.lastMessage}</p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Popper>
            )}
        >
            <Link className={cx('nav-link', 'nav-icon')} to="/" data-bs-toggle="dropdown">
                <i className={cx('bi bi-chat-left-text')}></i>
                {/* <span className={cx('badge', 'bg-danger', 'badge-number')}>4</span> */}
            </Link>
        </HeadlessTippy>
    );
}

export default NavMessage;
