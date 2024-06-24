import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import Button from '~/components/Button';

import styles from './BecomeTutor.module.scss';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9](?=.*[!@H$%])).{8,24}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const FULLNAME_REGEX = /^[a-zA-Z\s]+$/;
const REGISTER_URL = '/auth/signUp';

function BecomeTutor() {
    const context = useContext(ModalContext);
    const navigate = useNavigate();

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

    // const [cardId, setCardId] = useState('');
    // const [validCardID, setValidCardId] = useState(false);
    // const [cardFocus, setCardFocus] = useState(false);

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

    // useEffect(() => {
    //     const result = CARD_REGEX.test(cardId);
    //     setValidCardId(result);
    // }, [cardId]);

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

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = GMAIL_REGEX.test(gmail);
        const v4 = PHONE_REGEX.test(phone);
        const v5 = FULLNAME_REGEX.test(fullName);
        // const v3 = CARD_REGEX.test(cardId);

        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg('Invalid entry');
            return;
        }

        try {
            const response = await requests.post(
                REGISTER_URL,
                JSON.stringify({
                    fullName: fullName,
                    email: gmail,
                    userName: user,
                    password: pwd,
                    phoneNumber: phone,
                    gender: gender,
                    isActive: 1,
                    isAdmin: true,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            console.log(response?.data?.userId);
            context.setUserId(response?.data.userId);
            navigate('/registration/tutor/step2');
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
            {/* {
                <section>
                    <h1>Success</h1>
                    <p>
                        <a href="/">Sign in</a>
                    </p>
                </section>
            } */}
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
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validName || !user,
                                        invalid: !validName && user,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
                                <p>
                                    4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens
                                    allowed
                                </p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="password">
                                Password
                                <span className={cx({ valid: validPwd, hide: !validPwd })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validPwd || !pwd,
                                        invalid: !validPwd && pwd,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
                                <p>
                                    8 to 24 characters. Must include uppercase and lowercase letters, a number and a
                                    special character. Allowed special characters are allowed
                                </p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtRePassword">
                                Confirm Password
                                <span className={cx({ valid: validMatch, hide: !validMatch })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validMatch || !pwd,
                                        invalid: !validMatch && pwd,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
                                <p>Password is not matched</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtFullName">
                                Full Name
                                <span className={cx({ valid: validFullName, hide: !validFullName })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validFullName || !fullName,
                                        invalid: !validFullName && fullName,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
                                <p>Full name must not be contained numbers and special characters</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="email">
                                Email
                                <span className={cx({ valid: validGmail, hide: !validGmail })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validGmail || !gmail,
                                        invalid: !validGmail && gmail,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
                                <p>Syntax: "Hello@gmail.com";</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="phoneNumber">
                                Phone
                                <span className={cx({ valid: validPhone, hide: !validPhone })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validPhone || !phone,
                                        invalid: !validPhone && phone,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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

                        {/* <div className={cx('form_row')}>
                            <label htmlFor="txtEducation">Education</label>
                            <input
                                type="text"
                                id="txtEducation"
                                name="txtEducation"
                                className={cx('txtEducation')}
                                placeholder="Graduate FPT University"
                            ></input>
                        </div> */}

                        {/* <div className={cx('form_row')}>
                            <label htmlFor="txtAddress">Address</label>
                            <input
                                type="text"
                                id="txtAddress"
                                name="txtAddress"
                                className={cx('txtAddress')}
                                placeholder="Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                            ></input>
                        </div> */}

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
                                <label htmlFor="gentlemen">Boy</label>
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
                                <label htmlFor="lady">Girl</label>
                            </div>
                        </div>

                        <Button className={cx('submit')}>Next</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeTutor;
