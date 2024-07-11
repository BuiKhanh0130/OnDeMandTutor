import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import config from '~/config';
import Image from '~/components/Image';
import Sidebar from '../Sidebar/Sidebar';
import images from '~/assets/images';
import UserTutor from './UserTutor';
import Notification from '~/layouts/DefaultLayout/components/LogIn/Notification';
import { ModalContext } from '~/components/ModalProvider';
import { NotificationIcon } from '~/components/Icons';
import NavMessage from '~/layouts/Admin/components/HeaderAdmin/Nav/NavMessage';

import styles from './HeaderTutor.module.scss';

const cx = classNames.bind(styles);

function HeaderTutor() {
    const { avatar } = useContext(ModalContext);

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

                    <Col lg="2" className={cx('container__login-signup')}>
                        <Link to={config.routes.notification}>
                            <Notification>
                                <div className={cx('container__login-signup-noti')}>
                                    <NotificationIcon />
                                    <span className={cx('container__login-signup-number')}>2</span>
                                </div>
                            </Notification>
                        </Link>

                        <NavMessage />

                        <UserTutor>
                            <div className={cx('container__login-user')}>
                                <Image
                                    src={avatar.avatar}
                                    alt={avatar.fullName}
                                    className={cx('container__login-user-img')}
                                ></Image>
                            </div>
                        </UserTutor>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderTutor;
