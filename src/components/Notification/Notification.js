import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Notification.module.scss';
import { is } from 'date-fns/locale';
import { ModalContext } from '../ModalProvider';

const cx = classNames.bind(styles);

const NOTIFICATION_URl = 'notification/get_notifications';

function Notification({ children }) {
    const requestPrivate = useRequestsPrivate();
    const { isRead, setIsReadNoti } = useContext(ModalContext);
    const { notifications, setNotifications } = useContext(ModalContext);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getNotifications = async () => {
            const response = await requestPrivate.get(NOTIFICATION_URl, {
                signal: controller.signal,
            });
            isMounted &&
                setIsReadNoti(
                    response.data.filter((read) => {
                        return read.isRead === false;
                    }),
                );
        };
        getNotifications();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (isRead > 3) {
            setNotifications(isRead.slice(0, 3));
            return;
        }
        setNotifications(isRead);
    }, [isRead]);

    return (
        <HeadlessTippy
            interactive={true}
            // visible={true}
            appendTo={() => document.body}
            offset={[0, 20]}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <div className={cx('container')}>
                        <Popper>
                            {notifications.length > 0 &&
                                notifications.map((notification) => (
                                    <Link to={'/notifications'} className={cx('container__tag')}>
                                        <p>
                                            {notification.fullName} {notification.title}.
                                        </p>
                                        <div className={cx('container__tag-author')}>
                                            <strong>{notification.fullName}</strong>
                                            <span>{notification.createDay}</span>
                                        </div>
                                    </Link>
                                ))}
                            {notifications.length === 3 && (
                                <Link to="/notifications" className={cx('container__show-all')}>
                                    <p>Show all</p>
                                </Link>
                            )}
                        </Popper>
                    </div>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Notification;
