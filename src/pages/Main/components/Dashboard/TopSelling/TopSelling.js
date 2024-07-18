import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './TopSelling.module.scss';
import CardFilter from '../Card/CardFilter';
import TopSellingItem from './TopSellingItem';

const cx = classNames.bind(styles);

function TopSelling() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/topselling')
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
        <div className={cx('card', 'recent-selling', 'overflow-auto')}>
            <CardFilter filterChange={handleFilterChange} />

            <div className={cx('card-body pb-0')}>
                <h5 className={cx('card-title')}>
                    Recent Sales <span>|{filter}</span>
                </h5>

                <table className={cx('table table-border-less')}>
                    <thead className={cx('table-light')}>
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items &&
                            items.length > 0 &&
                            items.map((item) => <TopSellingItem key={item._id} item={item}></TopSellingItem>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopSelling;
