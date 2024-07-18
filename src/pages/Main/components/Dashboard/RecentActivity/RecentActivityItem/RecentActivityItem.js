import classNames from 'classnames/bind';

import styles from './RecentActivityItem.module.scss';
import { useState } from 'react';
import Tutor from '~/components/Tutor';
import Student from '~/components/Student';
import { CloseIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function RecentActivityItem({ item, role }) {
    const [showAccountTutor, setShowAccountTutor] = useState(false);
    const [showAccountStudent, setShowAccountStudent] = useState(false);

    const handleAccountTutor = () => {
        setShowAccountTutor(true);
    };

    const handleHiddenAccountTutor = () => {
        setShowAccountTutor(false);
    };

    const handleAccountStudent = () => {
        setShowAccountStudent(true);
    };

    const handleHiddenAccountStudent = () => {
        setShowAccountStudent(false);
    };

    return (
        <>
            <div
                className={cx('activity-item', 'd-flex')}
                onClick={() => {
                    if (role === 'Tutor') {
                        handleAccountTutor();
                    } else {
                        handleAccountStudent();
                    }
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={cx('activity-label')}>{item?.createDay.split('T')[1].split('.')[0]}</div>
                    <div style={{ fontSize: '0.8rem' }} className={cx('activity-label')}>
                        {item?.createDay.split('T')[0]}
                    </div>
                </div>
                <i
                    className={cx('bi bi-circle-fill', 'activity-badge', 'align-self-start', {
                        'text-success': item.accountIsActive,
                        'text-danger': !item.accountIsActive,
                    })}
                ></i>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ padding: '0 0 2px 8px' }} className={cx('activity-content')}>
                        {item.fullName}
                    </div>
                    <div styles={{ fontSize: '0.8rem' }} className={cx('activity-content')}>
                        {item.email}
                    </div>
                </div>
            </div>
            {showAccountTutor && (
                <div className={cx('modal')}>
                    <div className={cx('wrapper')}>
                        <Tutor id={item.tutorId}></Tutor>
                        <div className={cx('close')} onClick={handleHiddenAccountTutor}>
                            <CloseIcon className={cx('close-icon')} />
                        </div>
                    </div>
                </div>
            )}
            {showAccountStudent && (
                <div className={cx('modal')}>
                    <div className={cx('wrapper')}>
                        <Student id={item.tutorId}></Student>
                        <div className={cx('close')} onClick={handleHiddenAccountStudent}>
                            <CloseIcon className={cx('close-icon')} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RecentActivityItem;
