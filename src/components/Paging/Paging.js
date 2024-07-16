import React, { useEffect } from 'react';
import styles from './Paging.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Paging = ({ pagination, curPage, setcurPage }) => {
    const { limit } = pagination;
    const PageLimit = Array.from({ length: limit });
    const [active, setActive] = useState(curPage);
    useEffect(() => {
        setActive(curPage);
    }, [curPage]);

    const handleClick = (index) => {
        setActive(index);
        setcurPage(index);
    };

    const handleUp = () => {
        setActive(active < limit - 1 ? active + 1 : active);
        setcurPage(curPage < limit ? curPage + 1 : curPage);
    };

    const handleDown = () => {
        setActive(active > 0 ? active - 1 : active);
        setcurPage(curPage > 1 ? curPage - 1 : curPage);
    };

    return (
        <>
            <div className={cx('home-tutor')}></div>
            <ul className={cx('pagination', 'home-tutor__pagination')}>
                <li className={cx('pagination-item')}>
                    <a onClick={handleDown} className={cx('pagination-item__link')}>
                        <i className={cx('pagination-item__icon', 'bi bi-caret-left-fill')}></i>
                    </a>
                </li>
                {PageLimit.map((page, index) => {
                    return (
                        <li
                            key={index}
                            className={cx({
                                'pagination-item': active !== index + 1,
                                'pagination-item__active': active === index + 1,
                            })}
                        >
                            <a onClick={() => handleClick(index + 1)} className={cx('pagination-item__link')}>
                                {index + 1}
                            </a>
                        </li>
                    );
                })}
                <li className={cx('pagination-item')}>
                    <a onClick={handleUp} className={cx('pagination-item__link')}>
                        <i className={cx('pagination-item__icon', 'bi bi-caret-right-fill')}></i>
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Paging;
