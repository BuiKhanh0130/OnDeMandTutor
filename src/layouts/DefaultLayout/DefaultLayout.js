import classNames from 'classnames/bind';
import { useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '~/components/Login';
import { ModalContext } from '~/components/ModalProvider';
import { ScrollToTop } from '~/components/ScrollToTop';

import styles from './DefaultLayout.module.scss';
import CreateClass from '~/pages/GenerateClass/GenerateClass';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { active, activeSignUp, handleHiddenActive } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                {children}
                <ScrollToTop />
                <Footer />
            </div>
            {active && <Login onHide={handleHiddenActive} state={'Log In'}></Login>}
            {activeSignUp && <Login onHide={handleHiddenActive} state={'Register'}></Login>}
        </div>
    );
}

export default DefaultLayout;
