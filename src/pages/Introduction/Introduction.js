import classNames from 'classnames/bind';

import styles from './Introduction.module.scss';

const cx = classNames.bind(styles);

function Introduction() {
    return <div className={cx('wrapper')}></div>;
}

export default Introduction;
