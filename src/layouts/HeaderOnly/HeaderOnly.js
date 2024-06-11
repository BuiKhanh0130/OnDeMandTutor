import classNames from 'classnames/bind';

import HeaderNotSideBar from '../components/HeaderNotSideBar';

import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderNotSideBar></HeaderNotSideBar>
            {children}
        </div>
    );
}

export default HeaderOnly;
