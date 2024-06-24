import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';

import styles from './RecentActivity.module.scss';
import CardFilter from '../Card/CardFilter';
import RecentActivityItem from './RecentActivityItem';

const cx = classNames.bind(styles);

function RecentActivity() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/recentactiviy')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className={cx('card')}>
            <CardFilter filterChange={handleFilterChange} />
            <div className={cx('card-body')}>
                <h5 className={cx('card-title')}>
                    Recent Sales <span>|{filter}</span>
                </h5>
                <div className={cx('activity')}>
                    {items && items.length > 0 && items.map((item) => <RecentActivityItem item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default RecentActivity;
