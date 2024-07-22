import React, { useEffect, useState } from 'react';
import styles from './Cards.module.scss';
import classNames from 'classnames/bind';
import Card from '../Card';
import { UilUsdSquare, UilClipboardAlt, UilMoneyWithdrawal } from '@iconscout/react-unicons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);

const DASHBOARD_URL = 'dashboard/tutor_dashboard';

const Cards = () => {
    const requestPrivate = useRequestsPrivate();
    const [dataCard, setDataCard] = useState([]);

    useEffect(() => {
        const fetchDashBoard = async () => {
            try {
                const response = await requestPrivate.get(DASHBOARD_URL);
                console.log(response.data);
                setDataCard(response.data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        fetchDashBoard();
    }, [requestPrivate]);

    return (
        <div className={cx('Cards')}>
            {dataCard.map((card, index) => (
                <div key={index} className={cx('parentContainer')}>
                    <Card
                        title={card.title}
                        value={card.value}
                        data={card.data}
                        dates={card.dates}
                    />
                </div>
            ))}
        </div>
    );
};

export default Cards;
