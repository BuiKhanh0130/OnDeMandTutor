import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import requests from '~/utils/request';
import Subject from '~/pages/BecomeTutor2/Subject';
import { ModalContext } from '~/components/ModalProvider';
import Button from '~/components/Button';
import { InvalidIcon, ValidIcon } from '~/components/Icons';

import styles from './BecomeTutor2.module.scss';
import useDebounce from '~/hooks/useDebounce';

const IMGBB = 'https://api.imgbb.com/1/upload?key=9c7d176f8c72a29fa6384fbb49cff7bc';

const cx = classNames.bind(styles);

const CARD_REGEX = /^[0-9]{10}$/;
const HOURLYRATE_REGEX = /^[1-9][0-9]*$/;
const REGISTER_URL = '/auth/tutor-signUp';

function BecomeTutor2() {
    const { chooseSubject, setChooseSubject, userId, setTutorId } = useContext(ModalContext);
    const errRef = useRef();
    let file = '';

    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');

    const [cardId, setCardId] = useState('');
    const [validCardID, setValidCardId] = useState(false);
    const [cardFocus, setCardFocus] = useState(false);

    const [hourlyRate, setHourlyRate] = useState(1);
    const [validHourlyRate, setValidHourly] = useState(false);
    const [hourlyRateFocus, setHourlyRateFocus] = useState(false);

    const deboundedHourlyRate = useDebounce(hourlyRate, 500);

    console.log(deboundedHourlyRate);

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

    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        const result = CARD_REGEX.test(cardId);
        setValidCardId(result);
    }, [cardId]);

    useEffect(() => {
        const result = HOURLYRATE_REGEX.test(deboundedHourlyRate);
        setValidHourly(result);
    }, [deboundedHourlyRate]);

    useEffect(() => {
        setErrMsg('');
    }, [cardId, deboundedHourlyRate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = CARD_REGEX.test(cardId);
        const v1 = HOURLYRATE_REGEX.test(hourlyRate);
        console.log(hourlyRate);
        console.log(v, v1);
        const form = new FormData();
        if (!v && !v1) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            form.append('image', image);
            const response = await requests.post(IMGBB, form);
            if (response.status === 200) {
                file = response?.data?.data?.display_url;
            }

            try {
                const response = await requests.post(
                    REGISTER_URL,
                    JSON.stringify({
                        dob: date,
                        education: education,
                        typeOfDegree: typeOfDegree,
                        cardId: cardId,
                        hourlyRate,
                        photo: file,
                        headline: headline,
                        description: description,
                        address: address,
                        isActive: false,
                        accountId: userId,
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    },
                );
                setTutorId(response.data);
                if (response.status === 200) {
                    setChooseSubject(true);
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
                        <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                            {errMsg}
                        </p>
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
                            <div className={cx('form_row')}>
                                <label htmlFor="txtCardId">
                                    Card Id
                                    <span className={cx({ valid: validCardID, hide: !validCardID })}>
                                        <ValidIcon />
                                    </span>
                                    <span
                                        className={cx({
                                            hide: validCardID || !cardId,
                                            invalid: !validCardID && cardId,
                                        })}
                                    >
                                        <InvalidIcon />
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
                                    <span>Card ID must be 10 number</span>
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
                            <label htmlFor="judgePrice">Judge price</label>
                            <input
                                type="number"
                                id="judgePrice"
                                name="judgePrice"
                                className={cx('txtRePassword')}
                                autoComplete="off"
                                aria-describedby="uidnote"
                                value={hourlyRate}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    const hourlyRate = e.target.value;
                                    if (hourlyRate.startsWith(' ')) {
                                        return;
                                    }
                                    setHourlyRate(e.target.value);
                                }}
                                onFocus={() => {
                                    setHourlyRateFocus(true);
                                }}
                                onBlur={() => {
                                    setHourlyRateFocus(false);
                                }}
                            ></input>
                            <p
                                id="uidnote"
                                className={cx({
                                    instructions: hourlyRateFocus && hourlyRate && !validHourlyRate,
                                    offscreen: !(hourlyRateFocus && hourlyRate && !validHourlyRate),
                                })}
                            >
                                <span>Price must be positive not negative integers</span>
                            </p>
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
                            <label htmlFor="myfile">Avatar</label>
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        {chooseSubject && <Subject />}

                        <Button className={cx('submit')}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BecomeTutor2;
