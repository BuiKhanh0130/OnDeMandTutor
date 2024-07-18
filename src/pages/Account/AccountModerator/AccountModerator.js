import classNames from 'classnames/bind';

import PageTitle from '~/components/PageTitle';
import RegistrationAccount from '../components/Registration/RegistrationAccount';

import styles from './AccountModerator.module.scss';

const cx = classNames.bind(styles);

function AccountAdmin() {
    return (
        <main id="main" className={cx('main')}>
            <PageTitle page="Create Account Moderator" />
            <RegistrationAccount />
        </main>
    );
}

export default AccountAdmin;
