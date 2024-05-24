import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

import Button from '~/component/Button';

const cx = classNames.bind(styles);

function MenuItem({ item }) {
    return (
        <div className={cx('menu-item')}>
            <Button className={cx('menu-item-label')} to={item.link}>
                {item.label}
            </Button>
        </div>
    );
}

export default MenuItem;
