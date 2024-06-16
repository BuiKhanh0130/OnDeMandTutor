import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';

import CardFilter from '../Card/CardFilter';
import RecentSalesTable from './RecentSalesTable';

import styles from './RecentSell.module.scss';

const cx = classNames.bind(styles);

function RecentSell() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/recentsales')
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
        <div className={cx('card', 'recent-sales', 'overflow-auto')}>
            <CardFilter filterChange={handleFilterChange} />

            <div className={cx('card-body')}>
                <h5 className={cx('card-title')}>
                    Recent Sales <span>|{filter}</span>
                    <RecentSalesTable items={items} />
                </h5>
            </div>
        </div>
    );
}

export default RecentSell;
