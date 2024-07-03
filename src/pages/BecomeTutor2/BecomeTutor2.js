import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import requests from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import Button from '~/components/Button';

import styles from './BecomeTutor2.module.scss';

const IMGBB = 'https://api.imgbb.com/1/upload?key=9c7d176f8c72a29fa6384fbb49cff7bc';

const cx = classNames.bind(styles);

const CARD_REGEX = /^[0-9]{10}$/;
const REGISTER_URL = '/auth/tutor-signUp';

function BecomeTutor2() {
    const context = useContext(ModalContext);
    const navigate = useNavigate();
    const errRef = useRef();
    let file = '';

    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');

    const [cardId, setCardId] = useState('');
    const [validCardID, setValidCardId] = useState(false);
    const [cardFocus, setCardFocus] = useState(false);

    const [typeOfDegree, setTypeOfDegree] = useState('');
    const [typeOfDegreeFocus, setTypeOfDegreeFocus] = useState(false);

    const [headline, setHeadline] = useState('');
    const [headlineFocus, setHeadlineFocus] = useState(false);

    const [education, setEducation] = useState('');
    const [educationFocus, setEducationFocus] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [addressFocus, setAddressFocus] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        const result = CARD_REGEX.test(cardId);
        setValidCardId(result);
    }, [cardId]);

    useEffect(() => {
        setErrMsg('');
    }, [cardId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = CARD_REGEX.test(cardId);
        const form = new FormData();
        if (!v) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            form.append('image', image);
            const response = await axios.post(IMGBB, form);
            if (response.status === 200) {
                file = response?.data?.data?.display_url;
            }

            try {
                console.log(file);
                const response = await requests.post(
                    REGISTER_URL,
                    JSON.stringify({
                        dob: date,
                        education: education,
                        typeOfDegree: typeOfDegree,
                        cardId: cardId,
                        hourlyRate: 0,
                        photo: file,
                        headline: headline,
                        description: description,
                        address: address,
                        isActive: true,
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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Register</div>
                <div className={cx('currentForm')}>
                    <form className={cx('currentForm_content')} onSubmit={handleSubmit}>
                        <div className={cx('form_row-birth')}>
                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                className={cx('dateOfBirth')}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                                {errMsg}
                            </p>
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
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="txtDegree">Type of degree</label>
                            <input
                                type="text"
                                id="txtDegree"
                                name="txtDegree"
                                className={cx('txtEducation')}
                                placeholder="Graduate FPT University"
                                value={typeOfDegree}
                                onChange={(e) => {
                                    const typeOfDegreeValue = e.target.value;
                                    if (typeOfDegreeValue.startsWith(' ')) {
                                        return;
                                    }
                                    setTypeOfDegree(e.target.value);
                                }}
                                onFocus={() => {
                                    setTypeOfDegreeFocus(true);
                                }}
                                onBlur={() => {
                                    setTypeOfDegreeFocus(false);
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
                            <label htmlFor="headline">Head line</label>

                            <input
                                type="text"
                                id="headline"
                                name="headline"
                                className={cx('txtPassword')}
                                autoComplete="off"
                                // aria-invalid={validPwd ? 'false' : 'true'}
                                value={headline}
                                aria-describedby="uidnote"
                                onChange={(e) => {
                                    const headlineValue = e.target.value;
                                    if (headlineValue.startsWith(' ')) {
                                        return;
                                    }
                                    setHeadline(headlineValue);
                                }}
                                onFocus={() => {
                                    setHeadlineFocus(true);
                                }}
                                onBlur={() => setHeadlineFocus(false)}
                            ></input>
                        </div>

                        <div className={cx('form_row')}>
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className={cx('txtRePassword')}
                                autoComplete="off"
                                aria-describedby="uidnote"
                                value={description}
                                onChange={(e) => {
                                    const descriptionValue = e.target.value;
                                    if (descriptionValue.startsWith(' ')) {
                                        return;
                                    }
                                    setDescription(e.target.value);
                                }}
                                onFocus={() => {
                                    setDescriptionFocus(true);
                                }}
                                onBlur={() => {
                                    setDescriptionFocus(false);
                                }}
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

                        <div className={cx('form_row')}>
                            <label for="myfile">Photo Certificate</label>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <Button className={cx('submit')}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeTutor2;
