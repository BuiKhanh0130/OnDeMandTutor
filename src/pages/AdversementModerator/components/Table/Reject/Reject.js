import classNames from 'classnames/bind';

import styles from './Reject.module.scss';
import { CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Reject({ handleChangeContentReject, handleClose, handleReject }) {
    const { tutorId } = useContext(ModalContext);
    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <textarea
                        placeholder='ex. "Inappropriate language..."'
                        name="description"
                        onChange={handleChangeContentReject}
                    />
                </div>
                <Button className={cx('reject')} onClick={() => handleReject(tutorId)}>
                    Reject
                </Button>
                <div className={cx('close-icon')} onClick={handleClose}>
                    <CloseIcon></CloseIcon>
                </div>
            </div>
        </div>
    );
}

export default Reject;
