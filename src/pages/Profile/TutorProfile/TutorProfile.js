import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Button from '~/components/Button';
import requests, { requestsPrivate } from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';

import styles from './TutorProfile.module.scss';
import { CameraIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const IMGBB = 'https://api.imgbb.com/1/upload?key=9c7d176f8c72a29fa6384fbb49cff7bc';
const TUTORPROFILE = 'Tutors/GetTutorCurrent';
const UPDATEPROFILE = 'Tutors/UpdateTutor';

function TutorProfile() {
    const imgRef = useRef();
    const [file, setFile] = useState();
    const [avatar, setAvatar] = useState();
    const axiosPrivate = useRequestsPrivate();
    const [fullName, setFullName] = useState('');
    const [education, setEducation] = useState('');
    const [typeOfDegree, setTypeOfDegree] = useState('');
    const [cardId, setCardId] = useState('');
    const [dob, setDob] = useState('');
    const [hourlyRate, setHourlyRate] = useState(0);
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(TUTORPROFILE, {
                    signal: controller.signal,
                });
                setAvatar(response?.data?.avatar);
                setFullName(response?.data?.fullName);
                setAddress(response?.data?.address);
                setPhoneNumber(response?.data?.phoneNumber);
                setDob(response?.data?.dob);
                setGender(response?.data?.gender);
                setEducation(response?.data?.education);
                setTypeOfDegree(response?.data?.typeOfDegree);
                setCardId(response?.data?.cardId);
                setPhoto(response?.data?.photo);
                setHourlyRate(response?.data?.hourlyRate);
                setHeadline(response?.data?.headline);
                setDescription(response?.data?.description);
            } catch (err) {
                console.error(err);
            }
        };

        getUsers();

        return () => {
            controller.abort();
        };
    }, [axiosPrivate]);

    const handleUpdate = async () => {
        try {
            const response = await requestsPrivate.post(
                UPDATEPROFILE,
                JSON.stringify({
                    fullName,
                    gender,
                    phoneNumber,
                    avatar: file,
                    dob,
                    education,
                    typeOfDegree,
                    cardId,
                    hourlyRate,
                    photo,
                    headline,
                    description,
                    address,
                    isActive: true,
                }),
            );
            if (response.status) {
                window.location.reload();
            }
        } catch (error) {}
    };

    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    const handleAvatar = async (e) => {
        setAvatar(e.target.files[0]);
        const form = new FormData();
        try {
            form.append('image', avatar);
            const response = await requests.post(IMGBB, form);
            if (response.status === 200) {
                setFile(response?.data?.data?.display_url);
                console.log(file);
            }
        } catch (error) {}
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="12" className={cx('container__profile')}>
                        <div className={cx('container__profile-banner')}></div>
                        <div className={cx('container__profile-student-camera')} onClick={triggerFileInput}>
                            <CameraIcon className={cx('container__profile-student-icon')} />
                            <input
                                type="file"
                                id="file-input"
                                className={cx('container__profile-student-input')}
                                onChange={handleAvatar}
                            ></input>
                        </div>
                        <div className={cx('container__profile-student')}>
                            <Image src={file ? file : avatar} alt={fullName} ref={imgRef} />
                            <p>{fullName}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className={cx('container__user')}>
                        <h2>Profile</h2>
                        <div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="container__user-field-input"
                                    value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('container__user-field')}>
                                <p>Gender</p>
                                <div className={cx('container__user-field-radio')}>
                                    <input
                                        type="radio"
                                        className={cx('gender')}
                                        id="gentlemen"
                                        name="gender"
                                        defaultChecked={gender}
                                        style={{ width: '20px' }}
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
                                        defaultChecked={!gender}
                                        style={{ width: '20px' }}
                                        onChange={() => {
                                            setGender(false);
                                        }}
                                    ></input>
                                    <label htmlFor="lady">Girl</label>
                                </div>
                            </div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="name">Card Id</label>
                                <input
                                    type="text"
                                    id="card"
                                    className="container__user-field-input"
                                    value={cardId}
                                    onChange={(e) => {
                                        setCardId(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className="container__user-field-input"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-field-input"
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="school">Education</label>
                                <input
                                    type="text"
                                    id="education"
                                    className="container__user-field-input"
                                    value={education}
                                    onChange={(e) => {
                                        setEducation(e.target.target);
                                    }}
                                ></input>
                            </div>

                            <div className={cx('container__user-field')}>
                                <label htmlFor="school">Type Of Degree</label>
                                <input
                                    type="text"
                                    id="typeOfDegree"
                                    className="container__user-field-input"
                                    value={typeOfDegree}
                                    onChange={(e) => {
                                        setTypeOfDegree(e.target.target);
                                    }}
                                ></input>
                            </div>

                            <div className={cx('container__user-field')}>
                                <label htmlFor="school">Headline</label>
                                <input
                                    type="text"
                                    id="headline"
                                    className="container__user-field-input"
                                    value={headline}
                                    onChange={(e) => {
                                        setHeadline(e.target.target);
                                    }}
                                ></input>
                            </div>

                            <div className={cx('container__user-field')}>
                                <label htmlFor="school">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="container__user-field-input"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.target);
                                    }}
                                ></input>
                            </div>

                            <div className={cx('container__user-field')}>
                                <label htmlFor="school">Hourly Rate</label>
                                <input
                                    type="number"
                                    id="hourlyRate"
                                    className="container__user-field-input"
                                    value={hourlyRate}
                                    onChange={(e) => {
                                        setHourlyRate(e.target.target);
                                    }}
                                ></input>
                            </div>

                            <div className={cx('btn')}>
                                <Button orange small onClick={handleUpdate} className={cx('btn__cancel')}>
                                    Cancel
                                </Button>
                                <Button orange small onClick={handleUpdate} className={cx('btn__update')}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TutorProfile;
