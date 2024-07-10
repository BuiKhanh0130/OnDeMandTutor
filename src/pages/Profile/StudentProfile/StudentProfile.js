import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import Class from '~/components/Class';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Button from '~/components/Button';
import { CameraIcon } from '~/components/Icons';
import requests from '~/utils/request';

import styles from './StudentProfile.module.scss';

const cx = classNames.bind(styles);

const IMGBB = 'https://api.imgbb.com/1/upload?key=9c7d176f8c72a29fa6384fbb49cff7bc';
const STUDENTPROFILE = 'Students/GetStudentCurrent';
const UPDATEPROFILE = 'Students/UpdateStudent';

function StudentProfile() {
    const imgRef = useRef();
    let file = '';
    const axiosPrivate = useRequestsPrivate();
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [avatar, setAvatar] = useState();

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
        const form = new FormData();
        try {
            form.append('image', avatar);
            const response = await requests.post(IMGBB, form);
            if (response.status === 200) {
                file = response?.data?.data?.display_url;
                console.log(file);
            }

            try {
                const response = await axiosPrivate.post(
                    UPDATEPROFILE,
                    JSON.stringify({
                        fullName,
                        gender,
                        phoneNumber,
                        avatar: file,
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
        } catch (error) {}
    };

    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="12" className={cx('container__profile')}>
                        <div className={cx('container__profile-banner')}></div>
                        <div className={cx('container__profile-student')}>
                            <Image src={avatar} alt={fullName} ref={imgRef} />
                            <p>{fullName}</p>
                        </div>
                        <div className={cx('container__profile-student-camera')} onClick={triggerFileInput}>
                            <CameraIcon className={cx('container__profile-student-icon')} />
                            <input
                                type="file"
                                id="file-input"
                                className={cx('container__profile-student-input')}
                                onChange={(e) => setAvatar(e.target.files[0])}
                            ></input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" className={cx('container__user')}>
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
                    <Col lg="4" className={cx('container__course')}>
                        <h2>Courses attended</h2>
                        <Class separate />
                        <Class separate />
                        <Class separate />
                        <Class separate />
                        <Class separate />
                        <Class separate />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default StudentProfile;
