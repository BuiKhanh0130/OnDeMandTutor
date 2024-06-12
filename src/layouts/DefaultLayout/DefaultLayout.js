import classNames from 'classnames/bind';
import { useContext } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Login from '~/components/Login';
import { ModalContext } from '~/components/ModalProvider';
import { ScrollToTop } from '~/components/ScrollToTop';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const Login_Signup = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                {children}
                <ScrollToTop />
                <Footer />
            </div>
            {Login_Signup.active && <Login onHide={Login_Signup.handleHiddenActive} state={'Log In'}></Login>}
            {Login_Signup.activeSignUp && <Login onHide={Login_Signup.handleHiddenActive} state={'Register'}></Login>}
        </div>
    );
}

export default DefaultLayout;
