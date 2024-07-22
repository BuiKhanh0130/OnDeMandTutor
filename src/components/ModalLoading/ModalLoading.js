import classNames from 'classnames/bind';

import styles from './ModalLoading.module.scss';

const cx = classNames.bind(styles);

function ModalLoading({ children }) {
    return <div className={cx('modal')}>{children}</div>;
}

export default ModalLoading;
