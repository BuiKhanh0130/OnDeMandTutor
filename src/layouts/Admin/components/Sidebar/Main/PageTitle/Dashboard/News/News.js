import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './News.module.scss';
import CardFilter from '../Card/CardFilter';
import NewsPostItem from './NewsPostItem';

const cx = classNames.bind(styles);

function News() {
    const [news, setNews] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const fetchData = () => {
        fetch('http://localhost:4000/news')
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('card', 'wrapper')}>
            <CardFilter filterChange={handleFilterChange} />
            <div className={cx('card-body pb-0')}>
                <h5 className={cx('card-title')}>
                    News & Updates <span>|{filter}</span>
                </h5>
                <div className={cx('news')}>
                    {news && news.length > 0 && news.map((item) => <NewsPostItem item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default News;
