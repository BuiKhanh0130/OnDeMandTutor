import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth as Auth, db } from '~/firebase/firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import Class from '~/components/Class';
import useRequestsPrivate from '~/hook/useRequestPrivate';

import styles from './Student.module.scss';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function Student() {
    const [userDetails, setUserDetail] = useState(null);
    const method = localStorage.getItem('loginMethod');
    const axiosPrivate = useRequestsPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(ModalContext);
    const auth = context.auth;

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getUsers = async () => {
            if (method === 'Account') {
                try {
                    console.log(auth);
                    const response = await axiosPrivate.get('Admin/getRole', {
                        signal: controller.signal,
                    });
                    isMounted && setUserDetail(response.data);
                } catch (err) {
                    console.error(err);
                    navigate('/', { state: { from: location }, replace: true });
                }
            } else {
                Auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        const docRef = doc(db, 'Users', user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setUserDetail(docSnap.data());
                        } else {
                            console.log('User is not logged in');
                        }
                    }
                });
            }
        };
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="12" className={cx('container__profile')}>
                        <div className={cx('container__profile-banner')}></div>
                        <div className={cx('container__profile-student')}>
                            <Image src={userDetails?.photo} alt="NT" />
                            <p>Nguyen Thanh Phong</p>
                            {/* {users?.length ? (
                                <ul>
                                    {users.map((user, i) => (
                                        <li key={i}>{user?.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No users to display</p>
                            )} */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" className={cx('container__user')}>
                        <h2>Profile</h2>
                        <div action="GET">
                            <div className={cx('container__user-name')}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="container__user-name-input"
                                    value={userDetails?.firstName}
                                ></input>
                            </div>
                            <div className={cx('container__user-email')}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="container__user-email-input"
                                    value={userDetails?.email}
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
                            </div>
                            <div className={cx('container__user-address')}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="container__user-address-input"
                                    value=" Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
                                ></input>
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

export default Student;
