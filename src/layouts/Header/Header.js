import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';

import styles from './Header.module.scss';

import Image from '~/component/Image';
import Sidebar from '~/layouts/components/Sidebar';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Link className={cx('logo-link')} to={config.routes.home}>
                        <Image src={images.logo} alt={'aaa'} className={cx('logo-img')}></Image>
                    </Link>
                </div>
                <Sidebar />
                <div className={cx('login-signup')}></div>
            </div>
        </div>
    );
}

export default Header;
