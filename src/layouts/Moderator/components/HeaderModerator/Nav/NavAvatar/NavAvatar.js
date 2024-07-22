import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import Popper from '~/components/Popper';
import images from '~/assets/images';
import { LogoutIcon } from '~/components/Icons';
import useLogout from '~/hooks/useLogout';

import styles from './NavAvatar.module.scss';

const cx = classNames.bind(styles);

function NavAvatar() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    };
    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            className={cx('nav-item', 'dropdown')}
            render={(attrs) => (
                <Popper>
                    <ul className={cx('profile')}>
                        <li className={cx('profile-item')} onClick={signOut}>
                            <LogoutIcon className={cx('logout-item')} />
                            <span>Log out</span>
                        </li>
                    </ul>
                </Popper>
            )}
        >
            <li>
                <a className={cx('nav-link align-items-center pe-0', 'nav-profile')} href="/" data-bs-toggle="dropdown">
                    <img src={images.avatar} alt="NT" className={cx('rounded-circle')}></img>
                    <span className={cx('d-none d-md-block ps-2')}>F David</span>
                </a>
            </li>
        </HeadlessTippy>
    );
}

export default NavAvatar;
