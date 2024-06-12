import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import images from '~/assets/images';
import Class from '~/components/Class';

import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment() {
    return (
        <Container>
            <Row>
                <Col>
                    <div className={cx('container__title')}>
                        <h2>Create class successfully</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <div className={cx('container__content-title')}>
                        <h4>Make payment through VNPAY</h4>
                    </div>
                    <div className={cx('container__content')}>
                        <Row className={cx('container__content-transaction')}>
                            <Col lg="8">
                                <Row className={cx('container__content-payment')}>
                                    <Col lg="4">
                                        <Image src={images.qa} alt="QA"></Image>
                                    </Col>
                                    <Col lg="8">
                                        <Image src={images.vnpay} alt={'VNPay'}></Image>
                                        <p>Payment of learning fees</p>
                                        <span>200,000</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="4">
                                <Class background />
                            </Col>
                        </Row>
                        <div className={cx('container__footer')}>
                            <p>You need to go through the payment process so you can study next week</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Payment;
