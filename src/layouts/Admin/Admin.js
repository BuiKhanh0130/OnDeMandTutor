import classNames from 'classnames/bind';

import HeaderAdmin from './components/HeaderAdmin';

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

function Admin({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <HeaderAdmin />
                {children}
            </div>
        </div>
    );
}

export default Admin;
