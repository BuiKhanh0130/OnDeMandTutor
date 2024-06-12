import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';

import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification({ children }) {
    return (
        <HeadlessTippy
            interactive={true}
            // visible={true}
            appendTo={() => document.body}
            offset={[0, 20]}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <div className={cx('container')}>
                        <Popper>
                            <div className={cx('container__tag')}>
                                <p>
                                    <strong>D.Micale </strong>
                                    just has connect class with you. Please check it!
                                </p>
                            </div>
                            <div className={cx('container__tag')}>
                                <p>
                                    <strong>D.Micale </strong>
                                    just has connect class with you. Please check it!
                                </p>
                            </div>
                            <div className={cx('container__tag')}>
                                <p>
                                    <strong>D.Micale </strong>
                                    just has connect class with you. Please check it!
                                </p>
                            </div>
                            <div className={cx('container__tag')}>
                                <p>
                                    <strong>D.Micale </strong>
                                    just has connect class with you. Please check it!
                                </p>
                            </div>
                        </Popper>
                    </div>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Notification;
