import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';
import images from '~/assets/images';

import styles from './NavMessage.module.scss';

const cx = classNames.bind(styles);

function NavMessage() {
    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            className={cx('nav-item', 'dropdown')}
            render={(attrs) => (
                <Popper>
                    <ul className={cx('messages')}>
                        <li className={cx('dropdown-header')}>
                            You have 4 messages
                            <Link to="/">
                                <span className={cx('badge rounded-pill bg-primary p-2 ms-2')}>View all</span>
                            </Link>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('message-item')}>
                            <a href="/">
                                <img src={images.avatar} alt="NT" className={cx('rounded-circle')}></img>
                                <div>
                                    <h4>Maria Hudson</h4>
                                    <p>djasjhadksahdajhdjsak</p>
                                    <p>4 hrs.ago</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('message-item')}>
                            <a href="/">
                                <img src={images.avatar} alt="NT" className={cx('rounded-circle')}></img>
                                <div>
                                    <h4>Maria Hudson</h4>
                                    <p>djasjhadksahdajhdjsak</p>
                                    <p>4 hrs.ago</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('message-item')}>
                            <a href="/">
                                <img src={images.avatar} alt="NT" className={cx('rounded-circle')}></img>
                                <div>
                                    <h4>Maria Hudson</h4>
                                    <p>djasjhadksahdajhdjsak</p>
                                    <p>4 hrs.ago</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                    </ul>
                </Popper>
            )}
        >
            <Link className={cx('nav-link', 'nav-icon')} to="/" data-bs-toggle="dropdown">
                <i className={cx('bi bi-chat-left-text')}></i>
                <span className={cx('badge', 'bg-danger', 'badge-number')}>4</span>
            </Link>
        </HeadlessTippy>
    );
}

export default NavMessage;
