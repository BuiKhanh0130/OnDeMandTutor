import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside id="sidebar" className={cx('sidebar')}>
            <ul className={cx('sidebar-nav')} id="sidebar-nav">
                <li className={cx('nav-item')}>
                    <Link to="/dashboard-admin" className={cx('nav-link')}>
                        <i className={cx('bi bi-grid')}></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className={cx('nav-item')}>
                    <Link to="/ban-account" className={cx('nav-link')}>
                        <i className={cx('bi bi-ban')}></i>
                        <span>Ban account</span>
                    </Link>
                </li>

                <li className={cx('nav-item')}>
                    <Link
                        to="/"
                        className={cx('nav-link', 'collapsed')}
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapse"
                    >
                        <i className={cx('bi bi-menu-button-wide')}></i>
                        <span>Create account</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>

                    <ul id="components-nav" className={cx('nav-content', 'collapse')} data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/create_account-admin">
                                <i className="bi bi-bank2"></i>
                                <span>Admin</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/create_account-moderator">
                                <i className="bi bi-water"></i>
                                <span>Moderator</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
