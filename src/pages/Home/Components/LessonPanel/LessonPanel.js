import classNames from 'classnames/bind';

import styles from './LessonPanel.module.scss';

const cx = classNames.bind(styles);

function LessonPanel({ judgments }) {
    return (
        <div className={cx('LessonPanel')}>
            <div className={cx('LessonPanel_container')}>
                {judgments.map((judgment, index) => {
                    return (
                        <div key={index} className={cx('LessonPanel_items')}>
                            <div className={cx('LessonPanel_items-number')}>{judgment.number}</div>
                            <div className={cx('LessonPanel_items-title')}>{judgment.title}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LessonPanel;
