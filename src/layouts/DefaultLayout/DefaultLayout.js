import classNames from 'classnames/bind';
import { useContext } from 'react';

import Header from '../Header';
import Login from '~/component/Login';
import { ModalContext } from '~/component/ModalProvider';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const Login_Signup = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                {children}
            </div>
            {Login_Signup.active && <Login onHide={Login_Signup.handleHiddenActive}></Login>}
        </div>
    );
}

export default DefaultLayout;
