import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import Sidebar from './Sidebar';

import styles from './Rehearsal.module.scss';
import { useContext } from 'react';
import SendEmail from './SendEmail';
import ListTutorIntern from './ListTutorIntern';
import Complaint from './Complaint';

const cx = classNames.bind(styles);

function Rehearsal({ children }) {
    const { sendEmail, listTutor, complaintModerator } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <h1>Dashboard</h1>
            <Sidebar />
            {sendEmail && <SendEmail />}
            {listTutor && <ListTutorIntern />}
            {complaintModerator && <Complaint />}
        </div>
    );
}

export default Rehearsal;
