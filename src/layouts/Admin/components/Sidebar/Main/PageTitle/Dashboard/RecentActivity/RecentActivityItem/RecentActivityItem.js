import classNames from 'classnames/bind';

import styles from './RecentActivityItem.module.scss';

const cx = classNames.bind(styles);

function RecentActivityItem({ item }) {
    return (
        <div className={cx('activity-item', 'd-flex')}>
            <div className={cx('activity-label')}>{item.time}</div>
            <i className={cx('bi bi-circle-fill', 'activity-badge', `${item.color}`, 'align-self-start')}></i>
            {item.highlight === '' ? (
                <div className={cx('activity-content')}>{item.content}</div>
            ) : (
                <div className={cx('activity-content')}>
                    {item.content.substring(0, item.content.indexOf(item.highlight))}
                    <a href="/" className={cx('fw-bold text-dark')}>
                        {item.highlight}
                    </a>
                    {item.content.slice(item.content.indexOf(item.highlight) + item.highlight.length, -1)}
                </div>
            )}
        </div>
    );
}

export default RecentActivityItem;
