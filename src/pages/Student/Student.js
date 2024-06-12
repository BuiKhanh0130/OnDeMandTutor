import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import images from '~/assets/images';
import Class from '~/components/Class';

import styles from './Student.module.scss';

const cx = classNames.bind(styles);

function Student() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="12" className={cx('container__profile')}>
                        <div className={cx('container__profile-banner')}></div>
                        <div className={cx('container__profile-student')}>
                            <Image src={images.avatar} alt="NT" />
                            <p>Nguyen Thanh Phong</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" className={cx('container__user')}>
                        <h2>Profile</h2>
                        <form action="GET">
                            <div className={cx('container__user-name')}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="container__user-name-input"
                                    value="Nguyen Thanh Phong"
                                ></input>
                            </div>
                            <div className={cx('container__user-email')}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="container__user-email-input"
                                    value="@gmail.com"
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
                        </form>
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
