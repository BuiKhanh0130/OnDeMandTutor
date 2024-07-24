import classNames from 'classnames/bind';

import Table from './Table';
import { CloseIcon } from '~/components/Icons';

import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Complaint.module.scss';

const cx = classNames.bind(styles);

function Complaint() {
    const { setComplaintModerator } = useContext(ModalContext);
    const handleClose = () => {
        setComplaintModerator(false);
    };
    return (
        <div className={cx('wrapper')}>
            <Table name="Complaint" />
            <div className={cx('Close-icon')} onClick={handleClose}>
                <CloseIcon />
            </div>
        </div>
    );
}

export default Complaint;
