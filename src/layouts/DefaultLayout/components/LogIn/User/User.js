import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';
import request from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';

import styles from './User.module.scss';

const LOGOUT_URL = 'auth/signOut';

const cx = classNames.bind(styles);

function User({ children }) {
    const { auth, setAuth } = useContext(ModalContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await request.post(LOGOUT_URL);
            console.log(response);
            setAuth({});
        } catch (error) {
            console.log(error);
        }
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
                                    <Link to="/@NT">My profile</Link>
                                </li>
                                <li>
                                    <Link to="/transaction/history">Transaction history</Link>
                                </li>
                                <li onClick={handleLogout}>Log out</li>
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
