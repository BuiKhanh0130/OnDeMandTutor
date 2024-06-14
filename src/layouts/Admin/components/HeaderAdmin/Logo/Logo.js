import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

function Logo() {
    const handleToggleSideBar = () => {
        document.classList.toggle('toggle-sidebar-btn');
    };
    return (
        <div className={cx('d-flex align-items-center justify-content-between')}>
            <Link to={'/'} className={cx('logo', 'd-flex', 'align-item-center')}>
                {/* <Image src={images.logo} alt="logo" className={cx('header__logo')}></Image> */}
                <span className={cx('d-none d-lg-block')}>Admin Dashboard</span>
            </Link>
            <i className={cx('bi bi-list', 'toggle-sidebar-btn')} onClick={handleToggleSideBar}></i>
        </div>
    );
}

export default Logo;
