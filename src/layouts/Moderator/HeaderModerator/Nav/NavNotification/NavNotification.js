import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';

import styles from './NavNotification.module.scss';

const cx = classNames.bind(styles);

function NavNotification() {
    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            className={cx('nav-item', 'dropdown')}
            render={(attrs) => (
                <Popper>
                    <ul className={cx('notifications')}>
                        <li className={cx('dropdown-header')}>
                            You have 4 notifications
                            <Link to="/">
                                <span className={cx('badge rounded-pill bg-primary p-2 ms-2')}>View all</span>
                            </Link>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('notification-item')}>
                            <i className={cx('bi bi-exclamation-circle', 'text-warning')} />
                            <div>
                                <h4>Lorem Ipsum</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>30min. ago</p>
                            </div>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('notification-item')}>
                            <i className={cx('bi bi-exclamation-circle', 'text-warning')} />
                            <div>
                                <h4>Lorem Ipsum</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>30min. ago</p>
                            </div>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('notification-item')}>
                            <i className={cx('bi bi-exclamation-circle', 'text-warning')} />
                            <div>
                                <h4>Lorem Ipsum</h4>
                                <p>Quae dolorem earum veritatis oditseno</p>
                                <p>30min. ago</p>
                            </div>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                    </ul>
                </Popper>
            )}
        >
            <Link className={cx('nav-link', 'nav-icon')} to="/" data-bs-toggle="dropdown">
                <i className={cx('bi bi-bell')}></i>
                <span className={cx('badge', 'bg-primary', 'badge-number')}>4</span>
            </Link>
        </HeadlessTippy>
    );
}

export default NavNotification;
