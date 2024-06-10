import classNames from 'classnames/bind';

import styles from './SuggestAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestAccounts({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <AccountItem data={data} />
            </div>
        </div>
    );
}

export default SuggestAccounts;
