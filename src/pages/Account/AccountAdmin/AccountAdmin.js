import classNames from 'classnames/bind';

import PageTitle from '~/components/PageTitle';

import styles from './AccountAdmin.module.scss';
import RegistrationAccount from '../components/Registration/RegistrationAccount';

const cx = classNames.bind(styles);

function AccountAdmin() {
    return (
        <main id="main" className={cx('main')}>
            <PageTitle page="Create Account Admin" />
            <RegistrationAccount />
        </main>
    );
}

export default AccountAdmin;
