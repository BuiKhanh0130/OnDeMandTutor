import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './WebTraffic.module.scss';
import CardFilter from '../Card/CardFilter';
import WebTrafficChart from './WebTrafficChart';

const cx = classNames.bind(styles);

function WebTraffic() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };
    return (
        <div className={cx('card', 'wrapper')}>
            <CardFilter filterChange={handleFilterChange} />

            <div className={cx('card-body pd-0')}>
                <h5 className={'card-body'}>
                    Web Traffic <span>| {filter}</span>
                </h5>
                <WebTrafficChart />
            </div>
        </div>
    );
}

export default WebTraffic;
