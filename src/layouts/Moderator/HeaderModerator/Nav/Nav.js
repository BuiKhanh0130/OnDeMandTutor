import classNames from 'classnames/bind';

import NavAvatar from './NavAvatar';
import NavMessage from './NavMessage';
import NavNotification from './NavNotification';

import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

function Nav() {
    return (
        <nav className={cx('header-nav', 'ms-auto')}>
            <ul className={cx('d-flex', 'align-items-center')}>
                <NavNotification />
                <NavMessage />
                <NavAvatar />
            </ul>
        </nav>
    );
}

export default Nav;
