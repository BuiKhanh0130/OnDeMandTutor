import classNames from 'classnames/bind';

import styles from './LessonPanel.module.scss';

const cx = classNames.bind(styles);

function LessonPanel({ judgments }) {
    return (
        <div className={cx('LessonPanel')}>
            {judgments.map((judgment) => {
                return (
                    <div className={cx('LessonPanel_items')}>
                        <div className={cx('LessonPanel_items-number')}>{judgment.number}</div>
                        <div className={cx('LessonPanel_items-title')}>{judgment.title}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default LessonPanel;
