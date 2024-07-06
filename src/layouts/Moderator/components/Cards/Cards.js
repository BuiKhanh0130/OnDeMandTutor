import React from 'react';
import styles from './Cards.module.scss';
import classNames from 'classnames/bind';
import Card from '../Card';
import { UilUsdSquare, UilClipboardAlt, UilMoneyWithdrawal } from '@iconscout/react-unicons';

const cx = classNames.bind(styles);

const Cards = () => {
    const cardsData = [
        {
            title: 'Revenue',
            color: {
                backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
                boxShadow: '0px 10px 20px 0px #e0c6f5',
            },
            barValue: 70,
            value: '25,970',
            png: UilUsdSquare,
            series: [
                {
                    name: 'Revenue',
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
            ],
        },
        {
            title: 'MoneyWithdrawal',
            color: {
                backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
                boxShadow: '0px 10px 20px 0px #FDC0C7',
            },
            barValue: 80,
            value: '14,270',
            png: UilMoneyWithdrawal,
            series: [
                {
                    name: 'MoneyWithdrawal',
                    data: [10, 100, 50, 70, 80, 30, 40],
                },
            ],
        },
        {
            title: 'Expenses',
            color: {
                backGround: 'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
                boxShadow: '0px 10px 20px 0px #F9D59B',
            },
            barValue: 60,
            value: '4,270',
            png: UilClipboardAlt,
            series: [
                {
                    name: 'Expenses',
                    data: [10, 25, 15, 30, 12, 15, 20],
                },
            ],
        },
    ];

    return (
        <div className={cx('Cards')}>
            {cardsData.map((card, index) => {
                return (
                    <div key={index} className={cx('parentContainer')}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
