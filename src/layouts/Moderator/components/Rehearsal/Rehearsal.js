import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import Sidebar from './Sidebar';

import styles from './Rehearsal.module.scss';
import { useContext } from 'react';
import SendEmail from './SendEmail';
import ListTutorIntern from './ListTutorIntern';

const cx = classNames.bind(styles);

function Rehearsal({ children }) {
    const { sendEmail, listTutor } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <h1>Dashboard</h1>
            <Sidebar />
            {sendEmail && <SendEmail />}
            {listTutor && <ListTutorIntern />}
        </div>
    );
}

export default Rehearsal;
