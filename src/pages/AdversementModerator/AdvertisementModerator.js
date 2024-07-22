import classNames from 'classnames/bind';

import Table from './components/Table';

import styles from './AdvertisementModerator.module.scss';

const cx = classNames.bind(styles);

function AdvertisementModerator() {
    return (
        <div className={cx('MainDash')}>
            <h1>Dashboard</h1>
            <Table name={'Browse Advertisement'} />
        </div>
    );
}

export default AdvertisementModerator;
