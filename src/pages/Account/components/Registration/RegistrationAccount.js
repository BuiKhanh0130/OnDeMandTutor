import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { storage } from '~/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';

import styles from './RegistrationAccount.module.scss';
import Button from '~/components/Button';
import { InvalidIcon, ValidIcon } from '~/components/Icons';
import Image from '~/components/Image';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

const cx = classNames.bind(styles);
const REGISTER_URL = 'auth/moderator_signup';

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9](?=.*[!@H$%])).{8,24}$/;
const FULLNAME_REGEX = /^[a-zA-Z\s]+$/;

function RegistrationAccount() {
    const requestPrivate = useRequestsPrivate();
    const userRef = useRef();
    const errRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [gender, setGender] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [errMsg, setErrMsg] = useState();
    const [nameImage, setNameImage] = useState('');
    const [loadingImage, setLoadingImage] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [fullName, setFullName] = useState('');
    const [validFullName, setValidFullName] = useState(false);
    const [FullNameFocus, setFullNameFocus] = useState(false);

    const [gmail, setGmail] = useState('');
    const [validGmail, setValidGmail] = useState(false);
    const [gmailFocus, setGmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(userName);
        setValidUserName(result);
    }, [userName]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

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
    }, [userName, pwd]);

    //handle image to firebase
    const handleChangeImage = async () => {
        if (avatar == null) return;
        const imageRef = ref(storage, `images/${avatar.name + v4()}`);
        setLoadingImage(true);
        uploadBytes(imageRef, avatar).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((snapshot) => {
                setNameImage(snapshot);
                setLoadingImage(false);
            });
        });
    };

    //handle register
    const handleBecomeModerator = async () => {
        const response = await requestPrivate.post(
            REGISTER_URL,
            JSON.stringify({
                fullName,
                email: gmail,
                userName,
                password: pwd,
                phoneNumber: phone,
                gender,
                avatar: nameImage,
                isActive: 1,
            }),
        );
        if (response.status === 200) {
            setShowModal(true);
            setUserName('');
            setPwd('');
            setFullName('');
            setGender(true);
            setPhone();
            setNameImage('');
            setAvatar(null);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }
    };

    return (
        <Container className={cx('container')}>
            <Row>
                <Col lg="6">
                    <form>
                        <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                            {errMsg}
                        </p>
                        <div className={cx('container__profile')}>
                            <label id="userName" ref={userRef}>
                                Username
                                <span className={cx({ valid: validUserName, hide: !validUserName })}>
                                    <ValidIcon />
                                </span>
                                <span
                                    className={cx({
                                        hide: validUserName || !userName,
                                        invalid: !validUserName && userName,
                                    })}
                                >
                                    <InvalidIcon />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                aria-invalid={validUserName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                onFocus={() => {
                                    setUserNameFocus(true);
                                }}
                                onBlur={() => setUserNameFocus(false)}
                            ></input>
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: userNameFocus && userName && !validUserName,
                                    offscreen: !(userNameFocus && userName && !validUserName),
                                })}
                            >
                                <span>
                                    4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens
                                    allowed
                                </span>
                            </p>
                        </div>
                        <div className={cx('container__profile')}>
                            <label id="password">
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
                                value={pwd}
                                autoComplete="off"
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby="uidpwd"
                                onFocus={() => {
                                    setPwdFocus(true);
                                }}
                                onBlur={() => setPwdFocus(false)}
                                onChange={(e) => {
                                    setPwd(e.target.value);
                                }}
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
                        <div className={cx('container__profile')}>
                            <label id="fullName">
                                Full name{' '}
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
                                id="fullName"
                                value={fullName}
                                autoComplete="off"
                                aria-invalid={validFullName ? 'false' : 'true'}
                                aria-describedby="uidname"
                                onFocus={() => {
                                    setFullNameFocus(true);
                                }}
                                onBlur={() => setFullNameFocus(false)}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
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
                        <div className={cx('container__profile-gender')}>
                            <p>Gender</p>
                            <div className={cx('container__profile-gender-items')}>
                                <input
                                    type="radio"
                                    id="html"
                                    name="fav_language"
                                    value="Male"
                                    onChange={() => {
                                        setGender(true);
                                    }}
                                />
                                <label for="html">Male</label>
                                <input
                                    type="radio"
                                    id="css"
                                    name="fav_language"
                                    value="Female"
                                    onChange={() => {
                                        setGender(false);
                                    }}
                                />
                                 <label for="css">Female</label>
                            </div>
                        </div>
                        <div className={cx('container__profile')}>
                            <label id="email">
                                Email{' '}
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
                                type="text"
                                id="email"
                                value={gmail}
                                onChange={(e) => {
                                    setGmail(e.target.value);
                                }}
                                autoComplete="off"
                                aria-invalid={validGmail ? 'false' : 'true'}
                                aria-describedby="uidemail"
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

                        <div className={cx('container__profile')}>
                            <label id="phoneNumber">
                                PhoneNumber
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
                                value={phone}
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
                    </form>
                </Col>
                <Col lg="6">
                    <div className={cx('container__profile-avatar')}>
                        <div>
                            <label id="avatar">Avatar</label>
                            <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files[0])}></input>
                            {!loadingImage && (
                                <Button
                                    orange
                                    onClick={handleChangeImage}
                                    style={{ width: '60px', height: '20px', marginLeft: '4px', color: '#fff' }}
                                >
                                    Upload
                                </Button>
                            )}
                        </div>

                        {nameImage && <Image src={nameImage} alt="avatar" className={cx('container__image')}></Image>}
                    </div>
                </Col>
                <Button
                    orange
                    onClick={handleBecomeModerator}
                    style={{ width: '60px', height: '20px', marginLeft: 'auto', color: '#fff' }}
                >
                    Create
                </Button>
            </Row>
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your request has been sent successfully!</Modal.Body>
            </Modal>
        </Container>
    );
}

export default RegistrationAccount;
