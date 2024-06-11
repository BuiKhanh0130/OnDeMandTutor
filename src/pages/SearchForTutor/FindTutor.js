import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MultiRangeSlider from './component/MultiRangeSliderInput';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Search from '~/components/Search';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { StarIcon } from '~/components/Icons';

import styles from './FindTutor.module.scss';

const cx = classNames.bind(styles);

function FindTutor() {
    const [minValueRate, setMinValueRate] = useState(10);
    const [maxValueRate, setMaxValueRate] = useState(200);
    const [minValueAge, setMinValueAge] = useState(10);
    const [maxValueAge, setMaxValueAge] = useState(100);

    const handleInputRate = (e) => {
        setMinValueRate(e.minValue);
        setMaxValueRate(e.maxValue);
    };

    const handleInputAge = (e) => {
        setMinValueAge(e.minValue);
        setMaxValueAge(e.maxValue);
    };

    const dayOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], []);

    const tutors = useMemo(
        () => [
            {
                avatar: images.avatar,
                name: 'Nguyen Thanh Phong',
                title: 'Experienced Math Teacher, used to teach K-12 and at FPT University',
                bio: 'I am a certified high school Math teacher in the state of Maine. I am certified to teach k-12 Mathematics, Social Studies, and Spanish. Before that, I taught at University of Maine Orono as a TA for two years, and at The College of Coastal Georgia as the Math Tutor Coordinator. I have a BA in History and a BA in Mathematics with a Minor in Spanish.',
                describe:
                    'Nguyen Thanh Phong is an excellent tutor and has helped my son immensely this year in AP Stats. She is kind, effective, patient and communications very difficult material with ease. She also has a very easy going way about her that makes her even more special and effective. My son meets with her regularly and he and I both love that Rachael is so responsive.',
                role: 'tutor',
                rating: [
                    {
                        icon: StarIcon,
                        number: '5.0',
                        total: '1208',
                    },
                ],
                price: '$12.99',
                totalHourTeach: 4.017,
                respondTimeAbout: 11,
            },
            {
                avatar: images.avatar,
                name: 'Nguyen Hoang Phuc',
                title: 'Experienced Math Teacher, used to teach K-12 and at FPT University',
                bio: 'I am a certified high school Math teacher in the state of Maine. I am certified to teach k-12 Mathematics, Social Studies, and Spanish. Before that, I taught at University of Maine Orono as a TA for two years, and at The College of Coastal Georgia as the Math Tutor Coordinator. I have a BA in History and a BA in Mathematics with a Minor in Spanish.',
                describe:
                    'Nguyen Thanh Phong is an excellent tutor and has helped my son immensely this year in AP Stats. She is kind, effective, patient and communications very difficult material with ease. She also has a very easy going way about her that makes her even more special and effective. My son meets with her regularly and he and I both love that Rachael is so responsive.',
                role: 'student',
                rating: [
                    {
                        icon: StarIcon,
                        number: '5.0',
                        total: '1208',
                    },
                ],
                price: '$12.99',
                totalHourTeach: 4.017,
                respondTimeAbout: 11,
            },
            {
                avatar: images.avatar,
                name: 'Nguyen Thanh Phong',
                title: 'Experienced Math Teacher, used to teach K-12 and at FPT University',
                bio: 'I am a certified high school Math teacher in the state of Maine. I am certified to teach k-12 Mathematics, Social Studies, and Spanish. Before that, I taught at University of Maine Orono as a TA for two years, and at The College of Coastal Georgia as the Math Tutor Coordinator. I have a BA in History and a BA in Mathematics with a Minor in Spanish.',
                describe:
                    'Nguyen Thanh Phong is an excellent tutor and has helped my son immensely this year in AP Stats. She is kind, effective, patient and communications very difficult material with ease. She also has a very easy going way about her that makes her even more special and effective. My son meets with her regularly and he and I both love that Rachael is so responsive.',
                role: 'student',
                rating: [
                    {
                        icon: StarIcon,
                        number: '5.0',
                        total: '1208',
                    },
                ],
                price: '$12.99',
                totalHourTeach: 4.017,
                respondTimeAbout: 11,
            },
        ],
        [],
    );

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="3" className={cx('sidebar')}>
                    <form action="GET" className={cx('sidebar__items')}>
                        <p className={cx('sidebar__items-title')}>Filters</p>
                        <div className={cx('sidebar__items-hours')}>
                            <span className={cx('sidebar__items-hours-label')}>
                                Hourly rate:
                                <span>
                                    {minValueRate} - {maxValueRate === 200 ? 'up' : maxValueRate}
                                </span>
                            </span>
                            <MultiRangeSlider
                                min={10}
                                max={200}
                                step={5}
                                minValue={minValueRate}
                                maxValue={maxValueRate}
                                onInput={(e) => {
                                    handleInputRate(e);
                                }}
                            />
                        </div>
                        <div className={cx('sidebar__items-role')}>
                            <label htmlFor="levels" className={cx('sidebar__items-role-label')}>
                                Student's level
                            </label>
                            <select id="levels" className={cx('sidebar__items-role-level')}>
                                <option value="Elementary">Elementary</option>
                                <option value="Middle">Middle School</option>
                                <option value="High">High School</option>
                                <option value="Adult">Adult</option>
                            </select>
                        </div>
                        <div className={cx('sidebar__items-availability')}>
                            <p className={cx('sidebar__items-availability-title')}>Availability</p>
                            {dayOfWeek.map((day, index) => {
                                return (
                                    <div key={index} className={cx('sidebar__items-availability-list')}>
                                        <label htmlFor={day}>{day}</label>
                                        <input
                                            type="checkbox"
                                            id={day}
                                            value={day}
                                            className="sidebar__items-availability-list-day"
                                        ></input>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('sidebar__items-age')}>
                            <span className={cx('sidebar__items-age-label')}>
                                Tutor ate:
                                <span>
                                    {minValueAge} - {maxValueAge === 100 ? 'up' : maxValueAge}
                                </span>
                            </span>
                            <MultiRangeSlider
                                min={10}
                                max={100}
                                step={1}
                                minValue={minValueAge}
                                maxValue={maxValueAge}
                                onInput={(e) => {
                                    handleInputAge(e);
                                }}
                            />
                        </div>
                    </form>
                </Col>
                <Col lg="9" className={cx('result')}>
                    <Search width="770px" />
                    <Row className={cx('result__total')}>
                        <Col className={cx('result__total-number')}>
                            <p>
                                <strong>3,335 pirates 1 tutors </strong>fit your choices
                            </p>
                        </Col>
                        <Col className={cx('result__total-sort')}>
                            <form action="GET" className={cx('result__total-sort-form')}>
                                <label htmlFor="sort">
                                    <strong>Sort</strong>
                                </label>
                                <select id="sort">
                                    <option value="best">Best match</option>
                                    <option value="lowest">Lowest price</option>
                                    <option value="highest">Highest price</option>
                                    <option value="rating">Rating</option>
                                    <option value="experience">Experience</option>
                                </select>
                            </form>
                        </Col>
                    </Row>
                    <Row className={cx('result__wrapper')}>
                        {tutors.map((tutor, index) => {
                            return (
                                <div key={index} className={cx('result__wrapper-content')}>
                                    <Link to={`account/${tutor.role}/${tutor.name}`}>
                                        <Row className={cx('result__profile')}>
                                            <Col lg="2" className={cx('result__profile-img')}>
                                                <Image src={tutor.avatar} alt={tutor.name}></Image>
                                            </Col>
                                            <Col lg="6" className={cx('result__profile-header')}>
                                                <p className={cx('result__profile-header-name')}>
                                                    <strong>{tutor.name}</strong>
                                                </p>
                                                <p className={cx('result__profile-header-title')}>{tutor.title}</p>
                                                <p className={cx('result__profile-header-bio')}>{tutor.bio}</p>
                                            </Col>
                                            <Col lg="4" className={cx('result__profile-generality')}>
                                                {tutor.rating.map((rate, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx('result__profile-generality-valuate')}
                                                        >
                                                            <div
                                                                className={cx('result__profile-generality-valuate-ic')}
                                                            >
                                                                <rate.icon></rate.icon>
                                                                <rate.icon></rate.icon>
                                                                <rate.icon></rate.icon>
                                                                <rate.icon></rate.icon>
                                                                <rate.icon></rate.icon>
                                                            </div>
                                                            <span
                                                                className={cx(
                                                                    'result__profile-generality-valuate-number',
                                                                )}
                                                            >
                                                                {rate.number}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    'result__profile-generality-valuate-total',
                                                                )}
                                                            >
                                                                ({rate.total})
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                                <div className={cx('result__profile-generality-price')}>
                                                    <i className={cx('wc-clock-o', 'wc-green', 'text-center')}></i>
                                                    <span>{tutor.price}/hour</span>
                                                </div>
                                                <div className={cx('result__profile-generality-hour')}>
                                                    <span>{tutor.totalHourTeach}</span>
                                                </div>
                                                <div className={cx('result__profile-generality-respond')}>
                                                    <span>
                                                        Response Time: <strong>{tutor.respondTimeAbout} minutes</strong>
                                                    </span>
                                                </div>
                                                <Button
                                                    orange
                                                    // to={`account/${tutor.role}/${tutor.name}`}
                                                    className={cx('result__profile-generality-btn')}
                                                >
                                                    View {tutor.name} profile
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <p className={cx('result__profile-dsc')}>{tutor.describe}</p>
                                            </Col>
                                        </Row>
                                    </Link>
                                </div>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default FindTutor;
