import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import config from '~/config';
import Button from '~/components/Button';

import styles from './Customer.module.scss';

const cx = classNames.bind(styles);

function CustomerSay() {
    const comments = useMemo(
        () => [
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
            {
                img: images.avatar,
                title: 'Experienced, engaging and patient tutor',
                summary:
                    'Michael has taught my son since this summer. He is very experienced and knowledgeable. He keeps his lesson effective, engaging and fun. My son is able to stay focus and overcome his fear of writing. We definitely plan to keep working with Michael.',
                author: 'Jillian',
                tutor: 'Dane D.',
            },
        ],
        [],
    );
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="8" className={cx('container__comments')}>
                        <strong>Student reviews about tutors</strong>
                        <p>Reviews of tutors on On Demand Tutor by students and parents in your community</p>
                        <div className={cx('container__comments-tags')}>
                            {comments.map((comment, index) => {
                                return (
                                    <div key={index} className={cx('container__comments-tags-content')}>
                                        <div className={cx('container__comments-tags-content-item')}>
                                            <Image src={comment.img} alt={comment.tutor}></Image>
                                            <div>
                                                <strong>{comment.title}</strong>
                                                <p>{comment.summary}</p>
                                            </div>
                                        </div>
                                        <p className={cx('container__comments-tags-content-by')}>
                                            <strong>{comment.author}</strong> reviews{' '}
                                            <Link to={`/account/tutor/${comment.tutor}`}>{comment.tutor}</Link> from Ha
                                            Noi, Viet Nam
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col lg="4" className={cx('container__link')}>
                        <p>Student reviews tutors of On Demand Tutor</p>
                        <div className={cx('container__link-request')}>
                            <p>Appoint a tutor now</p>
                            <Button orange to={config.routes.requestTutor}>
                                Request a Tutor
                            </Button>
                        </div>
                        <div className={cx('container__link-search')}>
                            <p>View all tutor of On Demand Tutor</p>
                            <Button orange to={config.routes.findTutor}>
                                Search for Tutor
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CustomerSay;
