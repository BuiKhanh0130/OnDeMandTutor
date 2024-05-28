//This hook returns the current location object
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import BecomeStudent from './Level/BecomeStudent';
import BecomeTutor from './Level/BecomeTutor';
import Sidebar from './Level/Sidebar';

import styles from './Registration.module.scss';

const cx = classNames.bind(styles);

function Registration({ state }) {
    const location = useLocation();
    const data = location.state;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('level')}>
                    {data[0] && data[0] === 'registrationtutor' ? <BecomeTutor /> : <BecomeStudent />}
                </div>
                <div className={cx('sidebar')}>
                    <Sidebar id={data[1]} />
                </div>
            </div>
        </div>
    );
}

export default Registration;
