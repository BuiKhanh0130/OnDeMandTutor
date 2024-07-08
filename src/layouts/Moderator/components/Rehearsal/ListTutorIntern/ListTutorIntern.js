import classNames from 'classnames/bind';

import Table from './Table';
import { CloseIcon } from '~/components/Icons';

import styles from './ListTutorIntern.module.scss';
import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function ListTutorIntern() {
    const { setListTutor } = useContext(ModalContext);
    const handleClose = () => {
        setListTutor(false);
    };
    return (
        <div className={cx('wrapper')}>
            <Table />
            <div className={cx('Close-icon')} onClick={handleClose}>
                <CloseIcon />
            </div>
        </div>
    );
}

export default ListTutorIntern;
