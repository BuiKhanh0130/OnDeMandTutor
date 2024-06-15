import classNames from 'classnames/bind';

import Sidebar from './Level/Sidebar';

import styles from './Registration.module.scss';
import Header from '~/layouts/Header';

const cx = classNames.bind(styles);

function Registration({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                {children}
                <Sidebar></Sidebar>
            </div>
        </div>
    );
}

export default Registration;
