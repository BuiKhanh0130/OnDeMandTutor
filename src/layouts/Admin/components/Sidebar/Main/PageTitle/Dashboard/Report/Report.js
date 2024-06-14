import classNames from 'classnames/bind';
import { useState } from 'react';

import CardFilter from '../Card/CardFilter';
import ReportCharts from './ReportCharts';

import styles from './Report.module.scss';

const cx = classNames.bind(styles);

function Report() {
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };
    return (
        <div className={cx('card')}>
            <CardFilter filterChange={handleFilterChange} />
            <div className={cx('card-body')}>
                <h5 className={cx('card-title')}>
                    Reports
                    <span>/{filter}</span>
                </h5>
                <ReportCharts />
            </div>
        </div>
    );
}

export default Report;
