import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';

import styles from './HowItWork.module.scss';

const cx = classNames.bind(styles);

function HowItWork() {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row className={cx('container__header')}>
                    <Col lg="4" className={cx('container__header-title-left')}>
                        <p>Grow your tutoring business</p>
                    </Col>
                    <Col lg="8" className={cx('container__header-title-right')}>
                        <p>
                            Whether you’re new to tutoring or an established pro, listing your services on demand tutor
                            is the most effective way to build and manage your own successful tutoring business.
                        </p>
                    </Col>
                </Row>
                <Row className={cx('container__tag-profile')}>
                    <Col lg="4" className={cx('container__tag-profile-left')}>
                        <Image src={images.user} alt={'user'}></Image>
                        <strong>Create a free profile</strong>
                        <span>Customize your free, professional profile</span>
                        <Button orange to={'/'}>
                            CREATE YOUR PROFILE
                        </Button>
                    </Col>
                    <Col lg="8" className={cx('container__tag-profile-right')}>
                        <Row>
                            <Col lg="6" className={cx('container__tag-profile-right-steps')}>
                                <p>
                                    Millions of people search online for private tutors every day. On demand tutor lets
                                    you create a free online profile complete with pictures, videos, student reviews and
                                    more. Your profile has everything you need to showcase your qualifications and
                                    experience for potential students to review.s
                                </p>
                            </Col>
                            <Col lg="6" className={cx('container__tag-profile-right-judgement')}>
                                <Image src={images.sample} alt={'user'}></Image>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={cx('container__tag-student')}>
                    <Col lg="4" className={cx('container__tag-student-left')}>
                        <Image src={images.multiUser} alt={'user'}></Image>
                        <strong>Secure more students</strong>
                        <span>On demand tutor gives you access to the most tutoring opportunities</span>
                        <Button orange to={'/'}>
                            SECURE MORE STUDENTS
                        </Button>
                    </Col>
                    <Col lg="8" className={cx('container__tag-student-right')}>
                        <Row className={cx('container__tag-student-right-title')}>
                            <Col lg="12">
                                <span>On demand tutor marketplace</span>
                            </Col>
                        </Row>
                        <Row className={cx('container__tag-student-right-body')}>
                            <Col lg="6" className={cx('container__tag-student-right-steps')}>
                                <ul>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>
                                            Every month, millions of new students and parents come to On demand tutor to
                                            find a tutor.
                                        </span>
                                    </li>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>Tutors listed on On demand tutor have earned more than $64,000,000.</span>
                                    </li>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>New job opportunities are posted every minute!</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg="6" className={cx('container__tag-student-right-judgement')}>
                                <div className={cx('container__tag-student-right-judgement-content')}>
                                    <p>
                                        I find On demand tutor to be a brilliant way for students to find qualified
                                        tutors. As a tutor, this eliminates the tedious process of looking for a steady
                                        source of clients. On demand tutor does all the work for you. All you have to do
                                        is create a profile and students will contact you.
                                    </p>
                                    <span>â€“ Jamie Z. — over 600 tutoring hours</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={cx('container__tag-organized')}>
                    <Col lg="4" className={cx('container__tag-organized-left')}>
                        <Image src={images.setting} alt={'user'}></Image>
                        <strong>Manage your tutoring business</strong>
                        <span>Get the tools and support you need to manage your own successful tutoring business</span>
                        <Button orange to={'/'}>
                            BUILD YOUR BUSINESS
                        </Button>
                    </Col>
                    <Col lg="8" className={cx('container__tag-organized-right')}>
                        <Row className={cx('container__tag-organized-right-title')}>
                            <Col lg="12">
                                <span>Stay organized</span>
                            </Col>
                        </Row>
                        <Row className={cx('container__tag-organized-right-body')}>
                            <Col lg="6" className={cx('container__tag-organized-right-steps')}>
                                <ul>
                                    <li>
                                        <Image src={images.schedule} alt="tick"></Image>
                                        <span>Schedule and sync lessons with your personal calendar.</span>
                                    </li>
                                    <li>
                                        <Image src={images.schedule} alt="tick"></Image>
                                        <span>
                                            Collect student ratings and reviews to feature on your tutor profile.
                                        </span>
                                    </li>
                                    <li>
                                        <Image src={images.schedule} alt="tick"></Image>
                                        <span>Report and track your lesson and payment history.</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg="6" className={cx('container__tag-organized-right-judgement')}>
                                <ul>
                                    <li>
                                        <Image src={images.schedule} alt="tick"></Image>
                                        <span>Schedule and sync lessons with your personal calendar.</span>
                                    </li>
                                    <li>
                                        <Image src={images.schedule} alt="tick"></Image>
                                        <span>
                                            Collect student ratings and reviews to feature on your tutor profile.
                                        </span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={cx('container__tag-student')}>
                    <Col lg="4" className={cx('container__tag-student-left')}>
                        <Image src={images.paid} alt={'user'}></Image>
                        <strong>Get paid</strong>
                        <span>On demand tutor offers fast, hassle-free payment</span>
                        <Button orange to={'/'}>
                            SIGN UP TODAY
                        </Button>
                    </Col>
                    <Col lg="8" className={cx('container__tag-student-right')}>
                        <Row className={cx('container__tag-student-right-title')}>
                            <Col lg="12">
                                <span>Hassle-free pay</span>
                            </Col>
                        </Row>
                        <Row className={cx('container__tag-student-right-body')}>
                            <Col lg="6" className={cx('container__tag-student-right-steps')}>
                                <ul>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>Choose your own hourly rate.</span>
                                    </li>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>
                                            On demand tutor helps resolve billing issues and ensures you receive payment
                                            for your time.
                                        </span>
                                    </li>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>Receive fast, easy payment from On demand tutor by direct deposit.</span>
                                    </li>
                                    <li>
                                        <Image src={images.tick} alt="tick"></Image>
                                        <span>Top tutors have earned $50,000+ a year!</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg="6" className={cx('container__tag-student-right-judgement')}>
                                <div className={cx('container__tag-student-right-judgement-content')}>
                                    <p>
                                        With On demand tutor, I don’t need to worry about payments from my students; On
                                        demand tutor makes payment arrangements on my behalf, charges my students and
                                        deposits payment directly into my bank account.
                                    </p>
                                    <span>â€“ Roberto C. — over 200 tutoring hours</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={cx('container__tag-apply')}>
                    <Col lg="8" className={cx('container__tag-apply-title')}>
                        <span>Tutors listed on On demand tutor have earned more than</span>
                        <strong>$64,000,000</strong>
                    </Col>
                    <Col lg="4" className={cx('container__tag-apply-btn')}>
                        <Button orange to="/registration/tutor">
                            Apply now
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HowItWork;
