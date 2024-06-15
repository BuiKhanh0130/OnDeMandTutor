import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('container__move')}>
                <NavLink className={({ isActive }) => cx('item', { active: isActive })} to="/transaction/payment">
                    <li>Payment</li>
                </NavLink>
                <NavLink className={({ isActive }) => cx('item', { active: isActive })} to="/transaction/history">
                    <li>History</li>
                </NavLink>
            </ul>
        </div>
    );
}

export default Sidebar;
