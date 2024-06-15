import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import images from '~/assets/images';
import User from '../components/LogIn/User';
import Notification from '../components/LogIn/Notification';
import { NotificationIcon, BackIcon } from '~/components/Icons';

import styles from './HeaderNotSideBar.module.scss';

const cx = classNames.bind(styles);

function HeaderNotSideBar() {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="2" className={cx('container__logo')}>
                        <Link className={cx('container__logo-link')} to="/">
                            <Image src={images.logo} alt={'aaa'} className={cx('container__logo-img')} />
                        </Link>
                        <div className={cx('container__logo-back')}>
                            <BackIcon className={cx('container__logo-back-icon')} />
                            <Link to="/" className={cx('container__logo-back-title')}>
                                Back
                            </Link>
                        </div>
                    </Col>

                    <Col lg={{ span: 2, offset: 8 }} className={cx('container__login-signup')}>
                        <Notification>
                            <div className={cx('container__login-signup-noti')}>
                                <NotificationIcon />
                                <span className={cx('container__login-signup-number')}>2</span>
                            </div>
                        </Notification>
                        <User>
                            <div className={cx('container__login-user')}>
                                <Image
                                    src={images.avatar}
                                    alt="NTP"
                                    className={cx('container__login-user-img')}
                                ></Image>
                            </div>
                        </User>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderNotSideBar;
