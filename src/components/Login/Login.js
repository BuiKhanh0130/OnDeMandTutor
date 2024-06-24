import { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import firebase from 'firebase/compat/app';

import Image from '~/assets/images';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { CloseIcon } from '../Icons';

import styles from './Login.module.scss';

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyDERqCP1b33M7qBHOZpEF1b65iHNfPgvNM',
    authDomain: 'on-demand-tutor-de8fd.firebaseapp.com',
    // ...
};

firebase.initializeApp(config);

const cx = classNames.bind(styles);

function Login({ onHide, state }) {
    const [statePage, setFormState] = useState(state);
    const [filterForm, setFilterForm] = useState([]);

    const login_signup = useMemo(
        () => [
            {
                title: 'Log In',
                by: [
                    {
                        label: 'Login with Google',
                        image: Image.google,
                        forget: 'Forgot username or password?',
                        btn: 'LOG IN',
                    },
                ],
            },
            {
                title: 'Register',
                by: [
                    {
                        id: 1,
                        btn: 'Apply to become a tutor',
                        link: 'tutor/step1',
                    },
                    {
                        id: 2,
                        btn: 'Register as a student',
                        link: 'student/step1',
                    },
                ],
            },
        ],
        [],
    );

    useEffect(() => {
        const newForm = login_signup.find((form) => {
            return form.title === statePage;
        });
        setFilterForm(newForm);
    }, [statePage, login_signup]);

    const handleConvertPage = (page) => {
        setFormState(page);
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>{filterForm.title}</div>
                    <div className={cx('body')}>
                        {filterForm.by && filterForm.title === 'Log In' ? (
                            <SignIn item={filterForm.by} />
                        ) : (
                            <Signup item={filterForm.by} />
                        )}
                    </div>
                    <Footer onClick={handleConvertPage} filterForm={filterForm} />
                    <div onClick={onHide}>
                        <CloseIcon className={cx('close-icon')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
