import { useState, useEffect } from 'react';

import CardFilter from '../Card/CardFilter';
import BudgetReportItem from './BudgetReportItem';

import classNames from 'classnames/bind';

import styles from './BudgetReport.module.scss';

const cx = classNames.bind(styles);

function BudgetReport({ classNames }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    return (
        <div className={cx('card', 'wrapper')}>
            <CardFilter filterChange={handleFilterChange} />

            <div className={cx('card-body pd-8')}>
                <h5 className={'card-body'}>
                    Budget Report <span>| {filter}</span>
                </h5>
                <BudgetReportItem />
            </div>
        </div>
    );
}

export default BudgetReport;
