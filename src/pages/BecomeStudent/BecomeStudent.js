import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import requests from '~/utils/request';

import Button from '~/components/Button';

import styles from './BecomeStudent.module.scss';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9](?=.*[!@H$%])).{8,24}$/;
const CARD_REGEX = /^[1-9][0-9]{10}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[1-9][0-9]{9}$/;
const REGISTER_URL = '/register';

function BecomeStudent() {
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

    const [cardId, setCardId] = useState('');
    const [validCardID, setValidCardId] = useState(false);
    const [cardFocus, setCardFocus] = useState(false);

    const [gmail, setGmail] = useState('');
    const [validGmail, setValidGmail] = useState(false);
    const [gmailFocus, setGmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState();

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
        const result = CARD_REGEX.test(cardId);
        setValidCardId(result);
    }, [cardId]);

    useEffect(() => {
        const result = GMAIL_REGEX.test(gmail);
        setValidGmail(result);
    }, [gmail]);

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
        const v3 = CARD_REGEX.test(cardId);

        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid entry');
            return;
        }

        try {
            const response = await requests.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear input fields
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
                            <label htmlFor="username">
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
                                id="user"
                                name="txtUserName"
                                ref={userRef}
                                autoComplete="off"
                                className={cx('txtUserName')}
                                placeholder="Username"
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
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
                            <label htmlFor="txtPassword">
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
                                id="txtPassword"
                                name="txtPassword"
                                className={cx('txtPassword')}
                                placeholder="******"
                                autoComplete="off"
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setPwd(e.target.value);
                                }}
                                onFocus={() => {
                                    setPwdFocus(true);
                                }}
                                onBlur={() => setPwdFocus(false)}
                            ></input>
                            <p
                                id="uidnote"
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
                                className={cx('txtRePassword')}
                                placeholder="******"
                                autoComplete="off"
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setMatchPwd(e.target.value);
                                }}
                                onFocus={() => {
                                    setMatchFocus(true);
                                }}
                                onBlur={() => setMatchFocus(false)}
                            ></input>
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: matchFocus && matchPwd && !validMatch,
                                    offscreen: !(matchFocus && matchPwd && !validMatch),
                                })}
                            >
                                <p>Password is not matched</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtFullName">Last Name</label>
                            <input
                                type="text"
                                id="txtLastName"
                                name="txtLastName"
                                className={cx('txtFullName')}
                                placeholder="Justin Bieber"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtFullName">First Name</label>
                            <input
                                type="text"
                                id="txtFirstName"
                                name="txtFirstName"
                                className={cx('txtFullName')}
                                placeholder="Justin Bieber"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtCardId">
                                Card Id
                                <span className={cx({ valid: validCardID, hide: !validCardID })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validCardID || !cardId,
                                        invalid: !validCardID && cardId,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                </span>
                            </label>
                            <input
                                type="number"
                                id="txtCardId"
                                name="txtCardId"
                                className={cx('txtCardId')}
                                placeholder="00000000000"
                                autoComplete="off"
                                aria-invalid={validCardID ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setCardId(e.target.value);
                                }}
                                onFocus={() => {
                                    setCardFocus(true);
                                }}
                                onBlur={() => setCardFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: cardFocus && cardId && !validCardID,
                                    offscreen: !(cardFocus && cardId && !validCardID),
                                })}
                            >
                                <p>Card ID must be 11 number</p>
                            </p>
                        </div>

                        <div className={cx('form_row-birth-radio')}>
                            <div className={cx('form_row-birth')}>
                                <label htmlFor="dateOfBirth">Date of birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className={cx('dateOfBirth')}
                                ></input>
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
                                    ></input>
                                    <label htmlFor="gentlemen">Boy</label>
                                    <input
                                        type="radio"
                                        className={cx('gender')}
                                        id="lady"
                                        name="gender"
                                        value="lady"
                                    ></input>
                                    <label htmlFor="lady">Girl</label>
                                </div>
                            </div>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtEmail">
                                Email
                                <span className={cx({ valid: validGmail, hide: !validGmail })}>
                                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </span>
                                <span
                                    className={cx({
                                        hide: validGmail || !user,
                                        invalid: !validGmail && user,
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                </span>
                            </label>
                            <input
                                type="email"
                                id="txtEmail"
                                name="txtEmail"
                                className={cx('txtEmail')}
                                placeholder="user@gmail.com"
                                autoComplete="off"
                                aria-invalid={validGmail ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setGmail(e.target.value);
                                }}
                                onFocus={() => {
                                    setGmailFocus(true);
                                }}
                                onBlur={() => setGmailFocus(false)}
                            ></input>
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: gmailFocus && gmail && !validGmail,
                                    offscreen: !(gmailFocus && gmail && !validGmail),
                                })}
                            >
                                <p>Syntax: "Hello@gmail.com";</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtPhone">
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
                                id="txtPhone"
                                name="txtPhone"
                                className={cx('txtPhone')}
                                placeholder="+84"
                                autoComplete="off"
                                aria-invalid={validPhone ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                onFocus={() => {
                                    setPhoneFocus(true);
                                }}
                                onBlur={() => setPhoneFocus(false)}
                            ></input>
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: phoneFocus && phone && !validPhone,
                                    offscreen: !(phoneFocus && phone && !validPhone),
                                })}
                            >
                                <p>Required exactly 10 number and does not start with 0"</p>
                            </p>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtEducation">Education</label>
                            <input
                                type="text"
                                id="txtEducation"
                                name="txtEducation"
                                className={cx('txtEducation')}
                                placeholder="Graduate FPT University"
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtAddress">Address</label>
                            <input
                                type="text"
                                id="txtAddress"
                                name="txtAddress"
                                className={cx('txtAddress')}
                                placeholder="Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                            ></input>
                        </div>
                        <Button type="submit" className={cx('submit')}>
                            SIGN UP
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeStudent;
