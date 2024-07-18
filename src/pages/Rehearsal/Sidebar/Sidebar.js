import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Cards from './Cards';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Cards></Cards>
        </div>
    );
}

export default Sidebar;
