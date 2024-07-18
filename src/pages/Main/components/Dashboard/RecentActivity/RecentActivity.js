import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';

import styles from './RecentActivity.module.scss';
import RecentActivityItem from './RecentActivityItem';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);
const GETTENTUTOR_URL = 'account/show_10-tutor-new';
const GETTEENSTUDENT_URL = 'account/show_10-student-new';

function RecentActivity() {
    const requestPrivate = useRequestsPrivate();
    const [itemsTutor, setItemsTutor] = useState([]);
    const [itemsStudent, setItemsStudent] = useState([]);

    console.log(itemsTutor);
    console.log(itemsStudent);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTutorAccount = async () => {
            const response = await requestPrivate.get(GETTENTUTOR_URL, { signal: controller.signal });
            isMounted && setItemsTutor(response.data);
        };

        getTutorAccount();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTutorAccount = async () => {
            const response = await requestPrivate.get(GETTEENSTUDENT_URL, { signal: controller.signal });
            isMounted && setItemsStudent(response.data);
        };

        getTutorAccount();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
    return (
        <>
            <div className={cx('card')}>
                <div className={cx('card-body')}>
                    <h5 className={cx('card-title')}>Recent Tutor Account</h5>
                    <div className={cx('activity')}>
                        {itemsTutor &&
                            itemsTutor.length > 0 &&
                            itemsTutor.map((item) => (
                                <RecentActivityItem key={item.accountId} item={item} role="Tutor" />
                            ))}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '10px' }} className={cx('card')}>
                <div className={cx('card-body')}>
                    <h5 className={cx('card-title')}>Recent Student Account</h5>
                    <div className={cx('activity')}>
                        {itemsStudent &&
                            itemsStudent.length > 0 &&
                            itemsStudent.map((item) => (
                                <RecentActivityItem key={item.accountId} item={item} role="Student" />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecentActivity;
