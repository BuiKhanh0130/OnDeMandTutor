import classNames from 'classnames/bind';
import { useMemo } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import { StarIcon } from '~/components/Icons';
import Button from '~/components/Button';

import styles from './Tutor.module.scss';

const cx = classNames.bind(styles);

function Tutor() {
    const user = useMemo(
        () => [
            {
                img: images.avatar,
                name: 'Michael N.',
                subject: 'English/Writing/Reading/Study Habits Tutor',
                rating: 5,
                numberRated: 747,
                numberHour: '3,000',
                price: '$110',
                respondTime: 7,
                qualifications: `I have my ELA certification from City College of New York, having been taken multiple courses in early childhood, and primary education. I taught 5th & 6th grade English for two years, before going to middle and high schools. I also have extensive one-on-one tutoring experience with young learners, having worked with 3rd, 4th, 5th, and 6th graders to help them with elementary level English, math, social studies, and study skills. I am also extremely knowledgable about children's literature (my mother was a school librarian).`,
                relatedSubject: 'has also tutored Study Skills, Spelling and 10 more subjects.',
                bio: `I am a patient and knowledgeable teacher, tutor and writer with experience working with students of all levels of aptitude and academic interest. I'm born and raised in New York City, a product of the public schools system. I've worked for many years in both public and charter schools, teaching a diverse group of young learners. I've worked with high achieving students at one of NYC's top Gifted and Talented Programs. I've worked with the diverse population of Jackson Heights, struggling,...`,
                education: [
                    { university: 'Cornell University', certificate: 'English Theater' },
                    { university: 'CUNY', certificate: 'Masters' },
                    { university: 'Columbia University', certificate: 'Masters' },
                ],
                reviews: [
                    {
                        title: 'Best English Tutor',
                        summary: `I just asked my 16 yr old how her first session went and she told me that Michael was "the best English tutor that I've ever had."`,
                        by: `Pam, 38 lessons with Michael`,
                    },
                    {
                        title: 'Best English Tutor',
                        summary: `I just asked my 16 yr old how her first session went and she told me that Michael was "the best English tutor that I've ever had."`,
                        by: `Pam, 38 lessons with Michael`,
                    },
                    {
                        title: 'Best English Tutor',
                        summary: `I just asked my 16 yr old how her first session went and she told me that Michael was "the best English tutor that I've ever had."`,
                        by: `Pam, 38 lessons with Michael`,
                    },
                    {
                        title: 'Best English Tutor',
                        summary: `I just asked my 16 yr old how her first session went and she told me that Michael was "the best English tutor that I've ever had."`,
                        by: `Pam, 38 lessons with Michael`,
                    },
                ],
            },
        ],
        [],
    );
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                {user.map((tutor, index) => {
                    return (
                        <Row>
                            <Col lg="4" key={index} className={cx('container__contact')}>
                                <div className={cx('container__tag')}>
                                    <div className={cx('container__tag-info')}>
                                        <Image src={tutor.img} alt={tutor.name}></Image>
                                        <strong>{tutor.name}</strong>
                                        <p>{tutor.subject}</p>
                                        <div className={cx('container__tag-rating')}>
                                            <div>
                                                <StarIcon></StarIcon>
                                                <StarIcon></StarIcon>
                                                <StarIcon></StarIcon>
                                                <StarIcon></StarIcon>
                                                <StarIcon></StarIcon>
                                            </div>
                                            <span>{tutor.rating}</span>
                                            <span>({tutor.numberRated} ratings)</span>
                                        </div>
                                        <div className={cx('container__hour')}>
                                            <Image src={images.clock} alt="clock"></Image>
                                            <span>{tutor.numberHour} hours tutoring</span>
                                        </div>
                                    </div>
                                    <div className={cx('container__tag-connect')}>
                                        <strong>Hourly Rate: {tutor.price}</strong>
                                        <Button orange>Contact {tutor.name}</Button>
                                        <span className={cx('container__tag-connect-respond')}>
                                            Respond time: <strong>{tutor.respondTime} minutes</strong>
                                        </span>
                                    </div>
                                </div>
                            </Col>

                            <Col lg="8" className={cx('container__about')}>
                                <div className={cx('container__about-representative')}>
                                    <span>Qualifications for “Math”</span>
                                    <p>{tutor.qualifications}</p>
                                </div>
                                <div className={cx('container__about-content')}>
                                    <p className={cx('container__about-content-title')}>About {tutor.name}</p>
                                    <Row className={cx('container__about-bio')}>
                                        <Col lg="4">
                                            <span>Bio</span>
                                        </Col>
                                        <Col lg="8">
                                            <p>{tutor.bio}</p>
                                        </Col>
                                    </Row>
                                    <Row className={cx('container__about-education')}>
                                        <Col lg="4">
                                            <span>Education</span>
                                        </Col>
                                        <Col lg="8">
                                            {tutor.education.map((edu, index) => {
                                                return (
                                                    <div className={cx('container__about-education-ctf')}>
                                                        <span>{edu.university}</span>
                                                        <span>{edu.certificate}</span>
                                                    </div>
                                                );
                                            })}
                                        </Col>
                                    </Row>
                                </div>

                                <div className={cx('container__about-rating')}>
                                    <p className={cx('container__about-rating-title')}>Ratings and Reviews</p>
                                    <div>
                                        <Row className={cx('container__about-rating-header')}>
                                            <Col lg="4">
                                                <span>Rating</span>
                                            </Col>
                                            <Col lg="8">
                                                <p>IS COMING</p>
                                            </Col>
                                        </Row>
                                        <Row className={cx('container__about-rating-review')}>
                                            <Col lg="4" className={cx('container__about-rating-review-title')}>
                                                <span>Reviews</span>
                                            </Col>
                                            <Col lg="8" className={cx('container__about-rating-review-content')}>
                                                {tutor.reviews.map((review, index) => {
                                                    return (
                                                        <div className={cx('container__about-rating-review-item')}>
                                                            <p>{review.title}</p>
                                                            <p>{review.summary}</p>
                                                            <p>{review.by}</p>
                                                        </div>
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}

export default Tutor;
