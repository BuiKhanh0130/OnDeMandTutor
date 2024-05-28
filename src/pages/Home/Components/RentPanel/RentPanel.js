import classNames from 'classnames/bind';

import Image from '~/components/Image';

import styles from './RentPanel.module.scss';

const cx = classNames.bind(styles);

function RentPanel({ rents }) {
    return (
        <div className={cx('RentPanel')}>
            {rents.map((rentChildren, index) => {
                return (
                    <div key={index} className={cx('RentPanel-container')}>
                        <div className={cx('RentPanel-title')}>{rentChildren.title}</div>
                        <div className={cx('RentPanel-items')}>
                            <div className={cx('RentPanel-items-left')}>
                                <Image src={rentChildren.image} alt={rentChildren.title}></Image>
                            </div>
                            <div className={cx('RentPanel-items-right')}>
                                {rentChildren.steps.map((items, index) => {
                                    return (
                                        <div key={index} className={cx('RentPanel-items-right-content')}>
                                            <p>{items.label}</p>
                                            <span>{items.content}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default RentPanel;
