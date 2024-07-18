import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import Button from '~/components/Button';

import styles from './BecomeStudent.module.scss';
import { InvalidIcon, ValidIcon } from '~/components/Icons';

const IMGBB = 'https://api.imgbb.com/1/upload?key=9c7d176f8c72a29fa6384fbb49cff7bc';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9](?=.*[!@H$%])).{8,24}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const FULLNAME_REGEX = /^[a-zA-Z\s]+$/;
const REGISTER_URL = '/auth/signUp';

function BecomeStudent() {
    const context = useContext(ModalContext);
    const navigate = useNavigate();
    let file = '';

    const [avatar, setAvatar] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState();
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [fullName, setFullName] = useState('');
    const [validFullName, setValidFullName] = useState(false);
    const [FullNameFocus, setFullNameFocus] = useState(false);

    const [gmail, setGmail] = useState('');
    const [validGmail, setValidGmail] = useState(false);
    const [gmailFocus, setGmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [gender, setGender] = useState(true);

    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const result = GMAIL_REGEX.test(gmail);
        setValidGmail(result);
    }, [gmail]);

    useEffect(() => {
        const result = FULLNAME_REGEX.test(fullName);
        setValidFullName(result);
    }, [fullName]);

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result);
    }, [phone]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = GMAIL_REGEX.test(gmail);
        const v4 = PHONE_REGEX.test(phone);
        const v5 = FULLNAME_REGEX.test(fullName);

        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg('Invalid entry');
            return;
        }

        try {
            form.append('image', avatar);
            const response = await requests.post(IMGBB, form);
            console.log(response?.data);
            if (response.status === 200) {
                file = response?.data?.data?.display_url;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await requests.post(
                REGISTER_URL,
                JSON.stringify({
                    fullName,
                    email: gmail,
                    userName: user,
                    password: pwd,
                    phoneNumber: phone,
                    gender,
                    isActive: 1,
                    isAdmin: false,
                    avatar: file,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            context.setUserId(response?.data.userId);
            navigate('/registration/student/step2');
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error?.response?.status === 490) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Register</div>
                <div className={cx('currentForm')}>
                    <form className={cx('currentForm_content')} onSubmit={handleSubmit}>
                        <div className={cx('form_row')}>
                            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                                {errMsg}
                            </p>
                            <label htmlFor="userName">
                                User name
                                <span className={cx({ valid: validName, hide: !validName })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validName || !user,
                                        invalid: !validName && user,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="txtUserName"
                                ref={userRef}
                                autoComplete="off"
                                className={cx('txtUserName')}
                                placeholder="Username"
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                value={user}
                                onChange={(e) => {
                                    setUser(e.target.value);
                                }}
                                onFocus={() => {
                                    setUserFocus(true);
                                }}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: userFocus && user && !validName,
                                    offscreen: !(userFocus && user && !validName),
                                })}
                            >
                                <span>
                                    4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens
                                    allowed
                                </span>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="password">
                                Password
                                <span className={cx({ valid: validPwd, hide: !validPwd })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validPwd || !pwd,
                                        invalid: !validPwd && pwd,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="txtPassword"
                                className={cx('txtPassword')}
                                value={pwd}
                                placeholder="******"
                                autoComplete="off"
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby="uidpwd"
                                onChange={(e) => {
                                    setPwd(e.target.value);
                                }}
                                onFocus={() => {
                                    setPwdFocus(true);
                                }}
                                onBlur={() => setPwdFocus(false)}
                            ></input>
                            <p
                                id="uidpwd"
                                className={cx({
                                    instructions: pwdFocus && pwd && !validPwd,
                                    offscreen: !(pwdFocus && pwd && !validPwd),
                                })}
                            >
                                <span>
                                    8 to 24 characters. Must include uppercase and lowercase letters, a number and a
                                    special character. Allowed special characters are allowed
                                </span>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtRePassword">
                                Confirm Password
                                <span className={cx({ valid: validMatch, hide: !validMatch })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validMatch || !pwd,
                                        invalid: !validMatch && pwd,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="txtRePassword"
                                name="txtRePassword"
                                value={matchPwd}
                                className={cx('txtRePassword')}
                                placeholder="******"
                                autoComplete="off"
                                aria-invalid={validMatch ? 'false' : 'true'}
                                aria-describedby="uidre"
                                onChange={(e) => {
                                    setMatchPwd(e.target.value);
                                }}
                                onFocus={() => {
                                    setMatchFocus(true);
                                }}
                                onBlur={() => setMatchFocus(false)}
                            ></input>
                            <p
                                id="uidre"
                                className={cx({
                                    instructions: matchFocus && matchPwd && !validMatch,
                                    offscreen: !(matchFocus && matchPwd && !validMatch),
                                })}
                            >
                                <span>Password is not matched</span>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtFullName">
                                Full Name
                                <span className={cx({ valid: validFullName, hide: !validFullName })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validFullName || !fullName,
                                        invalid: !validFullName && fullName,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="txtFullName"
                                name="txtFullName"
                                className={cx('txtFullName')}
                                value={fullName}
                                placeholder="Justin Bieber"
                                autoComplete="off"
                                aria-invalid={validFullName ? 'false' : 'true'}
                                aria-describedby="uidname"
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                onFocus={() => {
                                    setFullNameFocus(true);
                                }}
                                onBlur={() => setFullNameFocus(false)}
                            ></input>
                            <p
                                id="uidname"
                                className={cx({
                                    instructions: FullNameFocus && !validFullName && fullName,
                                    offscreen: !(FullNameFocus && !validFullName && fullName),
                                })}
                            >
                                <span>Full name must not be contained numbers and special characters</span>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="email">
                                Email
                                <span className={cx({ valid: validGmail, hide: !validGmail })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validGmail || !gmail,
                                        invalid: !validGmail && gmail,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="txtEmail"
                                className={cx('txtEmail')}
                                value={gmail}
                                placeholder="user@gmail.com"
                                autoComplete="off"
                                aria-invalid={validGmail ? 'false' : 'true'}
                                aria-describedby="uidemail"
                                onChange={(e) => {
                                    setGmail(e.target.value);
                                }}
                                onFocus={() => {
                                    setGmailFocus(true);
                                }}
                                onBlur={() => setGmailFocus(false)}
                            ></input>
                            <p
                                id="uidemail"
                                className={cx({
                                    instructions: gmailFocus && gmail && !validGmail,
                                    offscreen: !(gmailFocus && gmail && !validGmail),
                                })}
                            >
                                <span>Syntax: "Hello@gmail.com";</span>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="phoneNumber">
                                Phone
                                <span className={cx({ valid: validPhone, hide: !validPhone })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validPhone || !phone,
                                        invalid: !validPhone && phone,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="txtPhone"
                                className={cx('txtPhone')}
                                value={phone}
                                placeholder="+84"
                                autoComplete="off"
                                aria-invalid={validPhone ? 'false' : 'true'}
                                aria-describedby="uidphone"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                onFocus={() => {
                                    setPhoneFocus(true);
                                }}
                                onBlur={() => setPhoneFocus(false)}
                            ></input>
                            <p
                                id="uidphone"
                                className={cx({
                                    instructions: phoneFocus && phone && !validPhone,
                                    offscreen: !(phoneFocus && phone && !validPhone),
                                })}
                            >
                                <p>Required exactly 10 number and does not start with 0"</p>
                            </p>
                        </div>

                        <div className={cx('form_row-radio')}>
                            <p>Gender</p>
                            <div className={cx('form_row-radio-content')}>
                                <input
                                    type="radio"
                                    className={cx('gender')}
                                    id="gentlemen"
                                    name="gender"
                                    value="gentlemen"
                                    onChange={() => {
                                        setGender(true);
                                    }}
                                ></input>
                                <label htmlFor="gentlemen">Male</label>
                                <input
                                    type="radio"
                                    className={cx('gender')}
                                    id="lady"
                                    name="gender"
                                    value="lady"
                                    onChange={() => {
                                        setGender(false);
                                    }}
                                ></input>
                                <label htmlFor="lady">Female</label>
                            </div>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="myfile">Avatar</label>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </div>

                        <Button className={cx('submit')}>Next</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeStudent;
