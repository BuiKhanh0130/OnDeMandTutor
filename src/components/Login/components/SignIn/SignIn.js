import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import config from '~/config';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import requests from '~/utils/request';

import styles from './SignIn.module.scss';

const LOG_URL = 'auth/signIn';

const cx = classNames.bind(styles);

function SignIn({ item, onChangeUsername, onChangePassword }) {
    const { setAuth } = useContext(ModalContext);
    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            console.log(JSON.stringify({ userName: userName, password: password }));
            const response = await requests.post(LOG_URL, JSON.stringify({ userName: userName, password: password }), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ userName, password, roles, accessToken });
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (!err?.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 415) {
                setErrMsg('Unsupported Media Type');
            } else {
                setErrMsg('Login failed');
            }
        }

        // await fetch('', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'included',
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     }),
        // });
        // setRedirect(true);
    };

    useEffect(() => {
        setErrMsg('');
    }, [userName, password]);

    if (redirect === true) {
        return <redirect to="/" />;
    }
    return item.map((signIn, index, onSubmit) => {
        return (
            <Fragment key={index}>
                {/* {
                    <section>
                        <h1>Success</h1>
                        <p>
                            <a href="/">Sign in</a>
                        </p>
                    </section>
                } */}
                <div className={cx('wrapper')}>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form className={cx('signIn-form')} onSubmit={handleSubmit}>
                        <label htmlFor="userName">User name</label>
                        <input
                            type="text"
                            id="userName"
                            ref={userRef}
                            className={cx('username')}
                            onChange={handleUsername}
                            autoComplete="off"
                            value={userName}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={cx('password')}
                            onChange={handlePassword}
                            value={password}
                            required
                        />
                        <Button className={cx('sign-in-form-btn')}>{signIn.btn}</Button>
                    </form>
                    <Link to={config.routes.home} className={cx('forgotten-link')}>
                        {signIn.forget}
                    </Link>
                    <form className={cx('signIn-form-by-google')}>
                        <img src={signIn.image} alt={signIn.label}></img>
                        <span>{signIn.label}</span>
                    </form>
                    <div className={cx('login-license')}>
                        <p className={cx('login-license-content')}>
                            By continuing with an account located in Vietnam, you agree to our Terms of
                            <Link to={config.routes.home}> Service</Link> and acknowledge that you have read our
                            <Link to={config.routes.home}> Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </Fragment>

            //The aria-live attribute is an ARIA (Accessible Rich Internet Applications) property that is used to indicate the priority level of dynamic content updates on a webpage.
            //Autocomplete is a feature provided by web browsers that automatically suggests or fills in form field values based on the user's previous input or stored data.
            //React creates these synthetic events to provide a consistent, cross-browser interface for handling events in a way that works the same across different browsers.
        );
    });
}

export default SignIn;
