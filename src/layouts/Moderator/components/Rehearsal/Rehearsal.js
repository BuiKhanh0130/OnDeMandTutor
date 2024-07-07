import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import Sidebar from './Sidebar';

import styles from './Rehearsal.module.scss';
import { useContext } from 'react';
import SendEmail from './SendEmail';

const cx = classNames.bind(styles);

function Rehearsal({ children }) {
    const { sendEmail } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <h1>Dashboard</h1>
            <Sidebar />
            {children}
            {sendEmail && <SendEmail />}
        </div>
    );
}

export default Rehearsal;
