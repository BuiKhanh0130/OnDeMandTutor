import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

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
import Notification from '~/components/Notification';
import { ModalContext } from '~/components/ModalProvider';
import { NotificationIcon } from '~/components/Icons';

import styles from './Header.module.scss';
import NavMessage from '~/components/NavMessage';

const cx = classNames.bind(styles);

function Header() {
    const { isRead, user, avatar, handleActive, handleActiveSignUp } = useContext(ModalContext);
    const alreadyLogin = user;

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

                    {alreadyLogin ? (
                        <Col lg="2" className={cx('container__login-signup')}>
                            <Link to="/notifications">
                                <Notification>
                                    <div className={cx('container__login-signup-noti')}>
                                        <NotificationIcon />
                                        <span className={cx('container__login-signup-number')}>
                                            {isRead ? isRead.length : 0}
                                        </span>
                                    </div>
                                </Notification>
                            </Link>

                            <NavMessage />

                            <User>
                                <div className={cx('container__login-user')}>
                                    <Image
                                        src={avatar.avatar}
                                        alt={avatar.fullName}
                                        className={cx('container__login-user-img')}
                                    ></Image>
                                </div>
                            </User>
                        </Col>
                    ) : (
                        <Col lg="2" className={cx('container__login-signup')}>
                            <Button onClick={handleActive} className={cx('container__login-signup-login-btn')}>
                                LOG IN
                            </Button>
                            <Button onClick={handleActiveSignUp} className={cx('container__login-signup-signup-btn')}>
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
