import classNames from 'classnames/bind';

import Image from '~/components/Image';

import styles from './SubjectPanel.module.scss';

const cx = classNames.bind(styles);

function LessonPanel({ subjects }) {
    return (
        <div className={cx('SubjectPanel')}>
            {subjects.map((subjectChildren, index) => {
                return (
                    <div key={index} className={cx('SubjectPanel-container')}>
                        <div className={cx('SubjectPanel-title')}>{subjectChildren.title}</div>
                        <div className={cx('SubjectPanel-items')}>
                            {subjectChildren.items.map((subject, index) => {
                                return (
                                    <div key={index} className={cx('SubjectPanel-item')}>
                                        <Image src={subject.icon} alt={subject.label} />
                                        <span>{subject.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default LessonPanel;
