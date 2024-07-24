import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import useLogout from '~/hooks/useLogout';
import Popper from '~/components/Popper';
import { ModalContext } from '~/components/ModalProvider';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User({ children }) {
    const logout = useLogout();
    const navigate = useNavigate();
    const { avatar } = useContext(ModalContext);

    const signOut = async () => {
        await logout();
        navigate('/');
    };

    return (
        <HeadlessTippy
            interactive={true}
            // visible={true}
            // offset={[0, 0]}
            appendTo={() => document.body}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('container')}>
                            <ul className={cx('container__list')}>
                                <li>
                                    <Link to={`/student/${avatar.fullName}`}>My profile</Link>
                                </li>

                                <Link to="/classes">
                                    <li>Your Classes</li>
                                </Link>

                                <Link to="/requestOfStudent">
                                    <li>Forms</li>
                                </Link>

                                <Link to="/myblog">
                                    <li>My Post</li>
                                </Link>

                                <Link to="/walletstudent">
                                    <li>Wallet</li>
                                </Link>

                                <li onClick={signOut}>Log out</li>
                            </ul>
                        </div>
                    </Popper>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default User;
