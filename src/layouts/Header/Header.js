import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';

import Image from '~/components/Image';
import Sidebar from '~/layouts/components/Sidebar';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Header.module.scss';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const formLogin = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Link className={cx('logo-link')} to={config.routes.home}>
                        <Image src={images.logo} alt={'aaa'} className={cx('logo-img')}></Image>
                    </Link>
                </div>
                <Sidebar />
                <div className={cx('login-signup')}>
                    <Button onClick={formLogin.handleActive} className={cx('login-btn')}>
                        LOG IN
                    </Button>
                    <Button onClick={formLogin.handleActiveSignUp} className={cx('signup-btn')}>
                        SIGN UP
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
