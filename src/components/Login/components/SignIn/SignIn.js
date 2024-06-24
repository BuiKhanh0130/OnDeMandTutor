import classNames from 'classnames/bind';
// import firebase from 'firebase/compat/app';
import { jwtDecode } from 'jwt-decode';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import config from '~/config';
import request from '~/utils/request';

import styles from './SignIn.module.scss';

const LOGIN_URL = 'auth/signIn';

// const uiConfig = {
//     signInFlow: 'redirect',
//     signInSuccessUrl: '/',
//     signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
// };

const cx = classNames.bind(styles);

function SignIn({ item, onChangeUsername, onChangePassword }) {
    const { setAuth, setActive } = useContext(ModalContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    //handle login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request.post(LOGIN_URL, JSON.stringify({ userName, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            const role = jwtDecode(accessToken);
            setAuth({ userName, password, role, accessToken });
            //set for next login
            setUsername('');
            setPassword('');
            localStorage.setItem('accessToken', JSON.stringify(response?.data));
            setActive(false);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    useEffect(() => {
        setErrMsg('');
    }, [userName, password]);

    return item.map((signIn, index, onSubmit) => {
        return (
            <Fragment key={index}>
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
                    {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
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
