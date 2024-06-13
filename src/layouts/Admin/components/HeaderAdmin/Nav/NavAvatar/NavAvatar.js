import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';
import images from '~/assets/images';

import styles from './NavAvatar.module.scss';

const cx = classNames.bind(styles);

function NavAvatar() {
    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            className={cx('nav-item', 'dropdown')}
            render={(attrs) => (
                <Popper>
                    <ul className={cx('profile')}>
                        <li className={cx('dropdown-header')}>
                            <h6>David</h6>
                            <span>Web Developer</span>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('profile-item')}>
                            <a href="/">
                                <i className={cx('bi bi-person')}>
                                    <span>My profile</span>
                                </i>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('profile-item')}>
                            <a href="/">
                                <i className={cx('bi bi-person')}>
                                    <span>My profile</span>
                                </i>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                        <li className={cx('profile-item')}>
                            <a href="/">
                                <i className={cx('bi bi-person')}>
                                    <span>My profile</span>
                                </i>
                            </a>
                        </li>
                        <li>
                            <hr className={cx('dropdown-divider')}></hr>
                        </li>
                    </ul>
                </Popper>
            )}
        >
            <li>
                <a className={cx('nav-link align-items-center pe-0', 'nav-profile')} href="/" data-bs-toggle="dropdown">
                    <img src={images.avatar} alt="NT" className={cx('rounded-circle')}></img>
                    <span className={cx('d-none d-md-block ps-2')}>F David</span>
                </a>
            </li>
        </HeadlessTippy>
    );
}

export default NavAvatar;
