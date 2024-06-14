import classNames from 'classnames/bind';

import styles from './CardFilter.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardFilter({ filterChange }) {
    return (
        <div className={cx('filter')}>
            <a className={cx('icon')} href="/" data-bs-toggle="dropdown">
                <i className={cx('bi bi-three-dots')}></i>
            </a>
            <ul className={cx('dropdown-menu dropdown-menu-end dropdown-menu-arrow')}>
                <li className={cx('dropdown-header', 'text-start')}>
                    <h6>Filter</h6>
                </li>
                <li className={cx('dropdown-item')}>
                    <Link to="#" onClick={() => filterChange('Today')}>
                        Today
                    </Link>
                </li>
                <li className={cx('dropdown-item')}>
                    <Link to="#" onClick={() => filterChange('This Month')}>
                        This Month
                    </Link>
                </li>
                <li className={cx('dropdown-item')}>
                    <Link to="#" onClick={() => filterChange('This Year')}>
                        This Year
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CardFilter;
