import classNames from 'classnames/bind';

import Image from '~/components/Image';

import styles from './AccountItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Button to={`/account/role/${data.name}`} className={cx('wrapper')}>
            <div className={cx('container')}>
                <Image src={data.avatar} alt={data.fullName} className={cx('container__img')} />
                <div className={cx('container__dsc')}>
                    <strong>{data.fullName}</strong>
                    <span>Join: {data.createDay.split('T')[0]}</span>
                </div>
            </div>
        </Button>
    );
}

export default AccountItem;
