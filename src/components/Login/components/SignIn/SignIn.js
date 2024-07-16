import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth as Auth } from '~/firebase/firebase';

import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import config from '~/config';
import request from '~/utils/request';
import useInput from '~/hooks/useInput';

import styles from './SignIn.module.scss';

const LOGIN_URL = 'auth/signIn';

const cx = classNames.bind(styles);

function SignIn({ item, onChangeUsername, onChangePassword }) {
    const { setAuth, setActive, handleUser, setUserId, setAvatar } = useContext(ModalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [userName, resetUser, userAttribs] = useInput('user', '');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    //handle login userName and password
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request.post(LOGIN_URL, JSON.stringify({ userName, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const accessToken = response?.data?.token;
            const user = jwtDecode(accessToken);
            const role = user.UserRole;
            const userID = user.UserId;
            const avatar = user.Avatar;
            const fullName = user.FullName;
            setUserId(userID);
            setAuth({ userName, role, accessToken });
            setAvatar({ avatar, fullName });
            //reset user
            resetUser();
            sessionStorage.setItem('accessToken', JSON.stringify(response?.data));
            setActive(false);
            handleUser();

            if (role === 'Moderator') {
                navigate('/moderator');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Please confirm email');
            } else if (err.response?.status === 401) {
                setErrMsg('Missing Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    //handle login with google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(Auth, provider).then(async (result) => {
            try {
                const response = await request.post('auth/signInWithGoogle', JSON.stringify(result.user.email), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                const accessToken = response?.data?.token;
                const user = jwtDecode(accessToken);
                const role = user.UserRole;
                const userID = user.UserId;
                const avatar = user.Avatar;
                const fullName = user.FullName;
                setUserId(userID);
                setAuth({ userName, role, accessToken });
                setAvatar({ avatar, fullName });
                //reset user
                resetUser();
                sessionStorage.setItem('accessToken', JSON.stringify(response?.data));
                setActive(false);
                handleUser();

                if (role === 'Moderator') {
                    navigate('/moderator');
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Please confirm email');
                } else if (err.response?.status === 401) {
                    setErrMsg('Missing Username or Password');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            }
        });
    };

    useEffect(() => {
        setErrMsg('');
    }, [userName, password]);

    return item.map((signIn, index, onSubmit) => {
        return (
            <Fragment key={index}>
                <div className={cx('wrapper')}>
                    <p ref={errRef} className={errMsg ? cx('errMsg') : cx('offscreen')} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form className={cx('signIn-form')} onSubmit={handleSubmit}>
                        <label htmlFor="userName">User name</label>
                        <input
                            type="text"
                            id="userName"
                            ref={userRef}
                            className={cx('username')}
                            {...userAttribs}
                            autoComplete="off"
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
                    <div className={cx('support')}>
                        {/* <div className={cx('support-trust')}>
                            <input type="checkbox" id="persist" onChange={toggleCheck} checked={check}></input>
                            <label htmlFor="persist">Trust This Device</label>
                        </div> */}
                        <Link to={config.routes.home} className={cx('forgotten-link')}>
                            {signIn.forget}
                        </Link>
                    </div>
                    <Button onClick={signInWithGoogle} className={cx('signIn-form-by-google')}>
                        <img src={signIn.image} alt={signIn.label}></img>
                        <span>{signIn.label}</span>
                    </Button>
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
