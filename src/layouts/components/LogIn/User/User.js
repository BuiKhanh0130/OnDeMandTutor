import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User({ children }) {
    return (
        <HeadlessTippy
            interactive={true}
            // visible={true}
            // offset={[0, 0]}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('container')}>
                            <ul className={cx('container__list')}>
                                <li>My profile</li>
                                <li>Handsome</li>
                                <li>Geography</li>
                                <li>Javascript</li>
                                <li>HTML</li>
                                <li>CSS</li>
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
