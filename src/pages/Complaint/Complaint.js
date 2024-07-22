import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '~/components/ModalProvider';
import { CloseIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Button from '~/components/Button';
import { SendIcon } from '~/components/Icons';

import styles from './Complaint.module.scss';

const cx = classNames.bind(styles);

const CREATE_COMPLAINT_URL = 'complaint/create_complaint';

function Complaint({ classId }) {
    const requestPrivate = useRequestsPrivate();
    const { userId, setComplaint } = useContext(ModalContext);
    const [description, setDescription] = useState('');

    const handleCloseComplaint = () => {
        setComplaint(false);
    };

    const handleComplaints = (e) => {
        setDescription(e.target.value);
    };

    const createComplaint = async () => {
        try {
            const response = await requestPrivate.post(
                CREATE_COMPLAINT_URL,
                JSON.stringify({ createDay: '2024-07-09T10:46:45.333Z', description, classId, complainter: userId }),
            );

            if (response.status === 200) {
                setComplaint(false);
                window.alert('Complaint had send! Thanks for reporting!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <label id="complaint"></label>
                <textarea
                    id="complaint"
                    className={cx('container__complaint')}
                    placeholder="Complaints"
                    value={description}
                    onChange={handleComplaints}
                ></textarea>
                <div className={cx('container__complaint-close')} onClick={handleCloseComplaint}>
                    <CloseIcon />
                </div>
                <div className={cx('container__complaint-send')} onClick={createComplaint}>
                    <SendIcon />
                </div>
            </div>
        </div>
    );
}

export default Complaint;
