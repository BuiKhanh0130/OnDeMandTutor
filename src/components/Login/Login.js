import { useMemo, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Fragment } from 'react';

import Image from '~/assets/images';
import Button from '../Button';
import config from '~/config';
import { ModalContext } from '../ModalProvider';
import { CloseIcon } from '../Icons';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login({ onHide, state }) {
    const [statePage, setFormState] = useState(state);
    const [filterForm, setFilterForm] = useState([]);

    console.log(statePage);

    const formModal = useContext(ModalContext);

    const login_signup = useMemo(
        () => [
            {
                title: 'Log In',
                by: [
                    {
                        label: 'Login with Google',
                        image: Image.google,
                        forget: 'Forgot username or password?',
                        btn: 'Log In',
                    },
                ],
            },
            {
                title: 'Register',
                by: [
                    {
                        id: 1,
                        btn: 'Apply to become a tutor',
                        link: 'tutor',
                    },
                    {
                        id: 2,
                        btn: 'Register as a student',
                        link: 'student',
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

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>{filterForm.title}</div>
                    <div className={cx('body')}>
                        {filterForm.by && filterForm.title === 'Log In' ? (
                            filterForm.by.map((signup_login, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className={cx('body-login-signup')}>
                                            <form className={cx('form-login-signup')}>
                                                <label htmlFor="username">User name</label>
                                                <input type="text" id="username" className={cx('username')}></input>
                                                <label htmlFor="password">Password</label>
                                                <input type="password" id="password" className={cx('password')}></input>
                                                <div className={cx('form-login-signup-btn')}>
                                                    <Button orange className={cx('form-login-signup-btn-item')}>
                                                        {signup_login.btn}
                                                    </Button>
                                                </div>
                                                <Link
                                                    to={config.routes.home}
                                                    className={cx('form-login-signup-forget')}
                                                >
                                                    {signup_login.forget}
                                                </Link>
                                            </form>
                                            <div className={cx('form-login-signup-by')}>
                                                <img src={signup_login.image} alt={signup_login.label}></img>
                                                <span>{signup_login.label}</span>
                                            </div>
                                        </div>
                                        <div className={cx('login-license')}>
                                            <p className={cx('login-license-content')}>
                                                By continuing with an account located in Vietnam, you agree to our Terms
                                                of
                                                <Link to={config.routes.home}> Service</Link> and acknowledge that you
                                                have read our
                                                <Link to={config.routes.home}> Privacy Policy</Link>.
                                            </p>
                                        </div>
                                    </Fragment>
                                );
                            })
                        ) : (
                            <div className={cx('register')}>
                                {filterForm.by &&
                                    filterForm.by.map((register) => {
                                        return (
                                            <Button
                                                key={register.id}
                                                large
                                                to={`/registration/${register.link}`}
                                                state={[register.link, register.id]}
                                                onClick={
                                                    formModal.handleHiddenActive || formModal.handleHiddenActiveSignUp
                                                }
                                            >
                                                {register.btn}
                                            </Button>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                    <div className={cx('footer')}>
                        {filterForm.title === 'Log In' ? (
                            <p>
                                Don't have an account?
                                <span
                                    onClick={() => {
                                        setFormState('Register');
                                    }}
                                >
                                    Sign up
                                </span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?
                                <span
                                    onClick={() => {
                                        setFormState('Log In');
                                    }}
                                >
                                    Log in
                                </span>
                            </p>
                        )}
                    </div>

                    <div onClick={onHide}>
                        <CloseIcon className={cx('close-icon')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
