import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '~/components/ModalProvider';
import { CloseIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Complaint.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const CREATE_COMPLAINT_URL = 'Complaints/CreateComplaint';

function Complaint() {
    const requestPrivate = useRequestsPrivate();
    const { setComplaint } = useContext(ModalContext);
    const [complainter, setComplainter] = useState('');
    const [description, setDescription] = useState('');
    const [classId, setClassId] = useState('');

    const handleCloseComplaint = () => {
        setComplaint(false);
    };

    const handleSetIdClass = (e) => {
        setClassId(e.target.value);
    };

    const handleComplaints = (e) => {
        setDescription(e.target.value);
    };

    const handleComplainter = (e) => {
        setComplainter(e.target.value);
    };

    const createComplaint = async () => {
        try {
            const response = await requestPrivate.post(
                CREATE_COMPLAINT_URL,
                JSON.stringify({ createDay: '2024-07-09T10:46:45.333Z', description, classId, complainter }),
            );

            console.log(response.status);
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
                <input id="classId" value={classId} onChange={handleSetIdClass}></input>
                <input id="complainter" value={complainter} onChange={handleComplainter}></input>
                <div className={cx('container__complaint-close')} onClick={handleCloseComplaint}>
                    <CloseIcon />
                </div>
                <Button onClick={createComplaint}>Send</Button>
            </div>
        </div>
    );
}

export default Complaint;
