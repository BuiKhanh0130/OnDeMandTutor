import classNames from 'classnames/bind';

import Header from '../Header';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
