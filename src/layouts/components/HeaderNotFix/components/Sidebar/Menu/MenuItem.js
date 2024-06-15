import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ item }) {
    return (
        <div className={cx('menu__item')}>
            <Button className={cx('menu__item-label')} to={item.link} state>
                {item.label}
            </Button>
        </div>
    );
}

export default MenuItem;
