import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Dashboard.module.scss';
import Card from './Card';
import Report from './Report';

const cx = classNames.bind(styles);

function Dashboard() {
    const [cards, setCards] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/card')
            .then((res) => res.json())
            .then((data) => {
                setCards(data);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className={cx('dashboard', 'section')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-8')}>
                    <div className={cx('row')}>
                        {cards && cards.length > 0 && cards.map((card) => <Card key={card.id} card={card} />)}
                        <div className={cx('col-12')}>
                            <Report />
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-4')}></div>
            </div>
        </section>
    );
}

export default Dashboard;
