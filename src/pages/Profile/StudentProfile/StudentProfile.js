import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { storage } from '~/firebase/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { Container, Row, Col } from 'react-bootstrap';

import Image from '~/components/Image';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Button from '~/components/Button';
import { CameraIcon } from '~/components/Icons';
import requests from '~/utils/request';

import styles from './StudentProfile.module.scss';
import { color } from 'echarts';

const cx = classNames.bind(styles);

const STUDENTPROFILE = 'student/get_student-current';
const UPDATEPROFILE = 'student/update_student';

function StudentProfile() {
    const imgRef = useRef();
    const axiosPrivate = useRequestsPrivate();
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [imageUrl, setNameImage] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(STUDENTPROFILE, {
                    signal: controller.signal,
                });
                setAvatar(response?.data?.avatar);
                setFullName(response?.data?.fullName);
                setAddress(response?.data?.address);
                setPhoneNumber(response?.data?.phoneNumber);
                setGender(response?.data?.gender);
                setSchoolName(response?.data?.schoolName);
                setAge(response?.data?.age);
            } catch (err) {
                console.error(err);
            }
        };

        getUsers();

        return () => {
            controller.abort();
        };
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await axiosPrivate.post(
                UPDATEPROFILE,
                JSON.stringify({
                    fullName,
                    gender,
                    phoneNumber,
                    avatar: imageUrl,
                    schoolName,
                    address,
                    age,
                    isParent: true,
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

    //up image
    const handleChangeImage = async (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0] == null) return;
        const avatar = e.target.files[0];
        console.log(avatar);
        const imageRef = ref(storage, `images/${avatar.name + v4()}`);
        uploadBytes(imageRef, avatar).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((snapshot) => {
                setNameImage(snapshot);
            });
        });
    };

    console.log(imageUrl);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="12" className={cx('container__profile')}>
                        <div className={cx('container__profile-banner')}></div>
                        <div className={cx('container__profile-student')}>
                            {imageUrl ? (
                                <Image src={imageUrl} alt={fullName} ref={imgRef} />
                            ) : (
                                <Image src={avatar} alt={fullName} ref={imgRef} />
                            )}
                            <p>{fullName}</p>
                        </div>
                        <div className={cx('container__profile-student-camera')} onClick={triggerFileInput}>
                            <CameraIcon className={cx('container__profile-student-icon')} />
                            <input
                                type="file"
                                id="file-input"
                                className={cx('container__profile-student-input')}
                                onChange={(e) => handleChangeImage(e)}
                            ></input>
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
                                    <label htmlFor="gentlemen">Male</label>
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
                                    <label htmlFor="lady">Female</label>
                                </div>
                            </div>
                            <div className={cx('container__user-field')}>
                                <label htmlFor="age">Age</label>
                                <input
                                    type="text"
                                    id="age"
                                    className="container__user-email-input"
                                    value={age}
                                    onChange={(e) => {
                                        setAge(e.target.value);
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
                                <label htmlFor="school">School</label>
                                <input
                                    type="text"
                                    id="school"
                                    className="container__user-field-input"
                                    value={schoolName}
                                    onChange={(e) => {
                                        setSchoolName(e.target.target);
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

export default StudentProfile;
