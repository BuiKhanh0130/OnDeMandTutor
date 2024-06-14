import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside id="sidebar" className={cx('sidebar')}>
            <ul className={cx('sidebar-nav')} id="sidebar-nav">
                <li className={cx('nav-item')}>
                    <Link to="/" className={cx('nav-link')}>
                        <i className={cx('bi bi-grid')}></i>
                        <span>Dashboard</span>
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
                        <span>Documents</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>

                    <ul id="components-nav" className={cx('nav-content', 'collapse')} data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/">
                                <i className="bi bi-airplane-engines"></i>
                                <span>Customer</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="bi bi-bank2"></i>
                                <span>Supplier</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="bi bi-water"></i>
                                <span>Logistic</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className={cx('nav-item')}>
                    <Link
                        to="/"
                        className={cx('nav-link', 'collapsed')}
                        data-bs-target="#forms-nav"
                        data-bs-toggle="collapse"
                    >
                        <i className="bi-journal-text"></i>
                        <span>Forms</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="forms-nav" className={cx('nav-content', 'collapse')} data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/">
                                <i className="bi-journal-text"></i>
                                <span>Application Form</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="bi bi-terminal"></i>
                                <span>Release Form</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="bi bi-alexa"></i>
                                <span>Cancellation Form</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className={cx('nav-item')}>
                    <Link
                        to="/"
                        className={cx('nav-link', 'collapsed')}
                        data-bs-target="#chars-nav"
                        data-bs-toggle="collapse"
                    >
                        <i className="bi bi-bar-chart"></i>
                        <span>Charts</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="chars-nav" className={cx('nav-content', 'collapse')} data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/">
                                <i className="bi bi-bar-chart-line"></i>
                                <span>Charts</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className={cx('nav-item')}>
                    <Link
                        className={cx('nav-link', 'collapsed')}
                        data-bs-target="#tables-nav"
                        data-bs-toggle="collapse"
                        aria-controls="tables-nav"
                        href="/"
                    >
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span>Tables</span>
                        <i className={cx('bi bi-chevron-down ms-auto')}></i>
                    </Link>
                    <ul id="tables-nav" className={cx('nav-content', 'collapse')} data-bs-parent="#sidebar-nav">
                        <li>
                            <Link to="/">
                                <i className="bi bi-app-indicator"></i>
                                <span>General Tables</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="bi bi-file-earmark-spreadsheet"></i>
                                <span>Data table</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
