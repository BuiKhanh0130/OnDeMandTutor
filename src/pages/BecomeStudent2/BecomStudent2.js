import classNames from 'classnames/bind';
import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import Button from '~/components/Button';

import styles from './BecomeStudent2.module.scss';

const cx = classNames.bind(styles);

const REGISTER_URL = '/auth/student-signUp';

function BecomeStudent2() {
    const context = useContext(ModalContext);
    const navigate = useNavigate();
    const errRef = useRef();
    const [isParent, setIsParent] = useState(false);

    const [schoolName, setSchoolName] = useState('');
    const [schoolNameFocus, setSchoolNameFocus] = useState(false);

    const [age, setAge] = useState('');
    const [ageFocus, setAgeFocus] = useState(false);

    const [education, setEducation] = useState('');
    const [educationFocus, setEducationFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [addressFocus, setAddressFocus] = useState(false);

    const [errMsg, setErrMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await requests.post(
                REGISTER_URL,
                JSON.stringify({
                    schoolName,
                    address,
                    age,
                    isParent,
                    accountId: context.userId,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            context.setUserId('');
            console.log(response.status);
            if (response.status === 200) {
                context.setActive(true);
                navigate('/');
            }
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
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtShoolName">School name</label>
                            <input
                                type="text"
                                id="txtShoolName"
                                name="txtShoolName"
                                className={cx('txtEducation')}
                                placeholder="Graduate FPT University"
                                value={schoolName}
                                onChange={(e) => {
                                    const schoolName = e.target.value;
                                    if (schoolName.startsWith(' ')) {
                                        return;
                                    }
                                    setSchoolName(e.target.value);
                                }}
                                onFocus={() => {
                                    setSchoolNameFocus(true);
                                }}
                                onBlur={() => {
                                    setSchoolNameFocus(false);
                                }}
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtEducation">Education</label>
                            <input
                                type="text"
                                id="txtEducation"
                                name="txtEducation"
                                className={cx('txtEducation')}
                                placeholder="Link"
                                value={education}
                                onChange={(e) => {
                                    const typeOfDegreeValue = e.target.value;
                                    if (typeOfDegreeValue.startsWith(' ')) {
                                        return;
                                    }
                                    setEducation(e.target.value);
                                }}
                                onFocus={() => {
                                    setEducationFocus(true);
                                }}
                                onBlur={() => {
                                    setEducationFocus(false);
                                }}
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                className={cx('txtPassword')}
                                autoComplete="off"
                                placeholder="0"
                                // aria-invalid={validPwd ? 'false' : 'true'}
                                value={age}
                                onChange={(e) => {
                                    const headlineValue = e.target.value;
                                    if (headlineValue.startsWith(' ')) {
                                        return;
                                    }
                                    setAge(headlineValue);
                                }}
                                onFocus={() => {
                                    setAgeFocus(true);
                                }}
                                onBlur={() => setAgeFocus(false)}
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
                                value={address}
                                onChange={(e) => {
                                    const addressValue = e.target.value;
                                    if (addressValue.startsWith(' ')) {
                                        return;
                                    }
                                    setAddress(e.target.value);
                                }}
                                onFocus={() => {
                                    setAddressFocus(true);
                                }}
                                onBlur={() => {
                                    setAddressFocus(false);
                                }}
                            ></input>
                        </div>

                        <div className={cx('form_row-radio')}>
                            <p>Is Parent</p>
                            <div className={cx('form_row-radio-content')}>
                                <input
                                    type="radio"
                                    className={cx('gender')}
                                    id="gentlemen"
                                    name="gender"
                                    value="gentlemen"
                                    onChange={() => {
                                        setIsParent(true);
                                    }}
                                ></input>
                            </div>
                        </div>

                        <Button className={cx('submit')}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeStudent2;
