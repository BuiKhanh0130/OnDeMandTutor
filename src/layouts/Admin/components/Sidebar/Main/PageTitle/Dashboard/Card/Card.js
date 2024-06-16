import classNames from 'classnames/bind';
import { useState } from 'react';

import CardFilter from './CardFilter';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ card }) {
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };
    return (
        <div className={cx('col-xxl-4 col-md-4')}>
            <div className={cx('card', 'info-card', 'sales-card')}>
                <CardFilter filterChange={handleFilterChange} />
                <div className={cx('card-body')}>
                    <h5 className={cx('card-title')}>
                        {card.name} <span> | {filter}</span>
                    </h5>

                    <div className={cx('d-flex align-items-center')}>
                        <div
                            className={cx(
                                'card-icon',
                                'rounded-circle d-flex align-items-center justify-content-center',
                            )}
                        >
                            <i className={cx(`${card.icon}`)}></i>
                        </div>
                        <div className={cx('ps-3')}>
                            <h6>
                                {card.name === 'Revenue'
                                    ? '$' + card.amount.toLocaleString('en-US')
                                    : card.amount.toLocaleString('en-US')}
                            </h6>
                            <span
                                className={cx(
                                    `${card.percentage > 0 ? 'text-success' : 'text-danger'} small pt-1 fw-bold`,
                                )}
                            >
                                {card.percentage > 0 ? card.percentage * 100 + '%' : -card.percentage * 100 + '%'}
                            </span>
                            <span className={cx('text-muted small pt-2 ps-1')}>
                                {card.percentage > 0 ? 'increase' : 'decrease'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
