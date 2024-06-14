import classNames from 'classnames/bind';

import styles from './Main.module.scss';
import PageTitle from './PageTitle';
import Dashboard from './PageTitle/Dashboard';

const cx = classNames.bind(styles);

function Main() {
    return (
        <main id="main" className={cx('main')}>
            <PageTitle page="Dashboard" />
            <Dashboard />
        </main>
    );
}

export default Main;
