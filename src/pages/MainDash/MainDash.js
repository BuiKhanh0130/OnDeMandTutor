import styles from './MainDash.module.scss';
import classNames from 'classnames/bind';
import Table from './components/Table';

const cx = classNames.bind(styles);

const MainDash = () => {
    return (
        <div className={cx('MainDash')}>
            <h1>Dashboard</h1>
            <Table name={'Browse classes'} />
        </div>
    );
};

export default MainDash;
