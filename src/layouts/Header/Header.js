import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import config from '~/config';
import Image from '~/components/Image';
import Sidebar from '~/layouts/components/Sidebar';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const formLogin = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="1" className={cx('logo')}>
                        <Link className={cx('logo-link')} to={config.routes.home}>
                            <Image src={images.logo} alt={'aaa'} className={cx('logo-img')}></Image>
                        </Link>
                    </Col>

                    <Col lg="9">
                        <Sidebar />
                    </Col>
                    <Col lg="2" className={cx('login-signup')}>
                        <Button onClick={formLogin.handleActive} className={cx('login-btn')}>
                            LOG IN
                        </Button>
                        <Button onClick={formLogin.handleActiveSignUp} className={cx('signup-btn')}>
                            SIGN UP
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
