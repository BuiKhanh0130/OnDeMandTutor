import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Popper from '~/components/Popper';
import { ModalContext } from '~/components/ModalProvider';

import useLogout from '~/hooks/useLogout';

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
            appendTo={() => document.body}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('container')}>
                            <ul className={cx('container__list')}>
                                <li>
                                    <Link to={`/tutor/${avatar.fullName}`}>My profile</Link>
                                </li>

                                <Link to="/requestOfTutor">
                                    <li>Request's Student</li>
                                </Link>

                                <Link to="/myApplyFormTutor">
                                    <li>My Post</li>
                                </Link>

                                <li>
                                    <Link to="/transaction/history">Feedback</Link>
                                </li>

                                <li>
                                    <Link to="/transaction/history">Wallet</Link>
                                </li>
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
