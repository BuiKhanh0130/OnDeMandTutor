import classNames from 'classnames/bind';

import styles from './ResponseComplaint.module.scss';
import { CloseIcon } from '~/components/Icons';
import { useContext, useState } from 'react';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Button from '~/components/Button';
import { ModalNotConfirm } from '~/components/Modal';

const cx = classNames.bind(styles);

const BROWSER_COMPLAINT_URL = 'moderator/get_complaint-detail';

function ResponseComplaint({ complaintId, setStatus }) {
    const requestPrivate = useRequestsPrivate();
    const { setResponseComplaint } = useContext(ModalContext);
    const [stu, setStu] = useState(true);
    const [pro, setPro] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [typeError, setTypeError] = useState('');

    const handleBrowseComplaint = async () => {
        if (pro === '') {
            setContent('Please fill reason response!')
            setTypeError('Warning')
            setShowModal(true);
        }
        try {
            const response = await requestPrivate.put(
                `${BROWSER_COMPLAINT_URL}?complaintId=${complaintId}&pro=${pro}&stu=${stu}`,
            );

            if (response.status === 200) {
                setContent('Browse successfully!')
                setTypeError('Success')
                setShowModal(true);
                setStatus(true);
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setResponseComplaint(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <textarea id="response" placeholder="Response" onChange={(e) => setPro(e.target.value)}></textarea>
                    <select id="status" onChange={(e) => setStu(e.target.value)}>
                        <option value={true}>Approve</option>
                        <option value={false}>Reject</option>
                    </select>
                    <Button orange className={cx('btn')} onClick={handleBrowseComplaint}>
                        Send
                    </Button>
                </div>
                <div className={cx('Close-icon')} onClick={handleClose}>
                    <CloseIcon />
                </div>
                <ModalNotConfirm showModal={showModal} handleCancel={handleCancel} content={content} typeError={typeError}></ModalNotConfirm>
            </div>
        </div>
    );
}

export default ResponseComplaint;
