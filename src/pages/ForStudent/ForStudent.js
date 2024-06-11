import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import config from '~/config';
import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import ExcellentTutor from './component/ExcellentTutor';

import styles from './ForStudent.module.scss';

const cx = classNames.bind(styles);

function ForStudent() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col className={cx('container__header')}>
                        <div className={cx('container__header-title')}>
                            YEP, YOU CAN <span>LEARN EVERYTHING </span>AT HERE
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={cx('container__steps')}>
                        <span>Three Steps. One Perfect Instructor.</span>
                        <p>
                            On Demand Tutor is the best way to learn anything. No matter what you’re interested in,
                            we’ll help you find, book lessons and stay in touch with the perfect instructor. You can
                            spend more time learning, and we’ll handle the rest. Here’s how it works:
                        </p>
                    </Col>
                </Row>
                <Row className={cx('container__levels')}>
                    <Col lg="6" className={cx('container__tutors')}>
                        <div className={cx('slide-track')}>
                            <ExcellentTutor />
                            <ExcellentTutor />
                            <ExcellentTutor />
                            <ExcellentTutor />
                            <ExcellentTutor />
                            <ExcellentTutor />
                            <ExcellentTutor />
                        </div>
                    </Col>
                    <Col lg="6" className={cx('container__introduction-1')}>
                        <Image src={images.one} alt="one"></Image>
                        <span>Pick Your Instructor</span>
                        <div className={cx('container__introduction-dsc')}>
                            <p>
                                Use Wyzant's tutor search tools to find the tutors that best meet your unique needs.
                                We’ve vetted each of your options and only show you the best instructors for your
                                search.
                            </p>
                            <p>
                                From there, check their credentials, read what other students are saying about them, and
                                see if they’ve had a background check or request one.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className={cx('container__levels')}>
                    <Col lg="6">
                        <div className={cx('container__introduction-2')}>
                            <Image src={images.two} alt="two"></Image>
                            <span>Chat With Your Instructor</span>
                            <div className={cx('container__introduction-dsc')}>
                                <p>
                                    When you find an instructor you’d like to work with, send them a message right here
                                    on our site. Or get the app and take the conversation on the road. Messaging is easy
                                    and instant no matter which route you decide to take
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6" className={cx('container__message')}>
                        <Image src={images.message} alt="message"></Image>
                    </Col>
                </Row>
                <Row className={cx('container__levels')}>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className={cx('container__introduction-3')}>
                            <Image src={images.three} alt="three"></Image>
                            <span>Book Your Lesson</span>
                            <div className={cx('container__introduction-dsc')}>
                                <p>
                                    Found someone you want to work with? There’s nothing left to do but book your first
                                    lesson. And, by the way, you either love your first lesson or the first hour is free
                                    thanks to our Good Fit Guarantee.
                                </p>
                                <p>
                                    You can learn in-person from the comfort of a coffee shop or online in the comfort
                                    of your slippers. And payments are hassle-free. You only pay after you’ve had a
                                    lesson, and On Demand Tutor securely processes everything for you.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={cx('container__1-1')}>
                        <p>
                            In person and online 1-1 lessons are the best, most efficient way to reach your goals. On
                            Demand Tutor fits any lifestyle by giving you complete control over your learning
                            experience.
                        </p>

                        <Button to={config.routes.findTutor} orange className={cx('container__1-1-btn')}>
                            GET STARTED ONLINE
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className={cx('container__national')}>
                        <p>Learn from the nation’s largest community of professional tutors.</p>
                        <Row>
                            <Col lg="4" className={cx('container__national-suggestions')}>
                                <Image src={images.person} alt="person"></Image>
                                <strong>VETTED EXPERTS.</strong>
                                <span>More qualified instructors than anywhere else, ready to help.</span>
                            </Col>
                            <Col lg="4" className={cx('container__national-suggestions')}>
                                <Image src={images.suit} alt="person"></Image>
                                <strong>THE RIGHT FIT.</strong>
                                <span>Find an expert who suits your needs and learning style.</span>
                            </Col>
                            <Col lg="4" className={cx('container__national-suggestions')}>
                                <Image src={images.chart} alt="person"></Image>
                                <strong>REAL RESULTS.</strong>
                                <span>Reach your goals faster with private, 1–to–1 lessons.</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={cx('container__help')}>
                    <Col lg="8" className={cx('container__questions')}>
                        <Image src={images.question} alt="question"></Image>
                        <div>
                            <strong>Have questions?</strong>
                            <p>Get answers in our Help Center or connect with Customer Support.</p>
                        </div>
                    </Col>
                    <Col lg="4" className={cx('container__questionLink')}>
                        <Button orange to={config.routes.findTutor}>
                            GET ANSWERS
                        </Button>
                        <Button orange to={config.routes.findTutor}>
                            CONTACT US
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ForStudent;
