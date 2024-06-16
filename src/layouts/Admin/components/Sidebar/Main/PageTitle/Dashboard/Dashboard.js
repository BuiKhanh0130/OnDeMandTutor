import classNames from 'classnames/bind';

import Report from './Report';
import BudgetReport from './BudgetReport';
import RecentSell from './RecentSell';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import WebTraffic from './WebTraffic';
import News from './News';
import Cards from './Cards';

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <section className={cx('dashboard', 'section')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-8')}>
                    <div className={cx('row')}>
                        <Cards />
                        <div className={cx('col-12')}>
                            <Report />
                        </div>
                        <div className={cx('col-12', 'recent-sale')}>
                            <RecentSell />
                        </div>
                        <div className={cx('col-12', 'recent-sale')}>
                            <TopSelling />
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-4')}>
                    <RecentActivity />
                    <BudgetReport />
                    <WebTraffic />
                    <News />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
