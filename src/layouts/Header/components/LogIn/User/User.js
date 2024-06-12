import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import Popper from '~/components/Popper';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User({ children }) {
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

                                <li>Log out</li>
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
