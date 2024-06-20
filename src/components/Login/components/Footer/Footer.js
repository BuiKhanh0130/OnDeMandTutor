import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer({ onClick, filterForm }) {
    return (
        <div className={cx('wrapper')}>
            {filterForm.title === 'Log In' ? (
                <p>
                    Don't have an account?
                    <span onClick={() => onClick('Register')}>Sign up</span>
                </p>
            ) : (
                <p>
                    Already have an account?
                    <span onClick={() => onClick('Log In')}>Log in</span>
                </p>
            )}
        </div>
    );
}

export default Footer;
