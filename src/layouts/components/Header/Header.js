import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth as Auth, db } from '~/firebase/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import config from '~/config';
import Image from '~/components/Image';
import Sidebar from './components/Sidebar';
import images from '~/assets/images';
import Button from '~/components/Button';
import User from './components/LogIn/User';
import Notification from './components/LogIn/Notification';
import { ModalContext } from '~/components/ModalProvider';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationIcon } from '~/components/Icons';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [userDetails, setUserDetail] = useState(null);
    const context = useContext(ModalContext);
    const user = context.user;

    useEffect(() => {
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
    });

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="1" className={cx('container__logo')}>
                        <Link className={cx('container__logo-link')} to={config.routes.home}>
                            <Image src={images.logo} alt={'aaa'} className={cx('container__logo-img')}></Image>
                        </Link>
                    </Col>

                    <Col lg="9">
                        <Sidebar />
                    </Col>

                    {user ? (
                        <Col lg="2" className={cx('container__login-signup')}>
                            <Link to={'/notifications'}>
                                <Notification >
                                    <div className={cx('container__login-signup-noti')}>
                                        <NotificationIcon />
                                        <span className={cx('container__login-signup-number')}>2</span>
                                    </div>
                                </Notification>
                            </Link>

                            <User>
                                <div className={cx('container__login-user')}>
                                    <Image
                                        src={userDetails?.photo}
                                        alt="NTP"
                                        className={cx('container__login-user-img')}
                                    ></Image>
                                </div>
                            </User>
                        </Col>
                    ) : (
                        <Col lg="2" className={cx('container__login-signup')}>
                            <Button onClick={context.handleActive} className={cx('container__login-signup-login-btn')}>
                                LOG IN
                            </Button>
                            <Button
                                onClick={context.handleActiveSignUp}
                                className={cx('container__login-signup-signup-btn')}
                            >
                                SIGN UP
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default Header;
