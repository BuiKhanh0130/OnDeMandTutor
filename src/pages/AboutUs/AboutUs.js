import classNames from 'classnames/bind';
import { useMemo } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from '~/components/Button';
import config from '~/config';
import images from '~/assets/images';
import Search from '~/components/Search';

import styles from './AboutUs.module.scss';

const cx = classNames.bind(styles);

function AboutUs() {
    const steps = useMemo(
        () => [
            {
                image: images.different1,
                summary: 'Compare qualifications, hourly rates, and reviews to find the right expert for you.',
            },
            {
                image: images.different2,
                summary: 'Collaborate with your tutor in the free, browser based OnDemandTutor Learning Studio.',
            },
            {
                image: images.different3,
                summary: 'Teaching methods to meet the learning needs of many students.',
            },
        ],
        [],
    );

    const infors = useMemo(
        () => [
            {
                image: images.aboutUs1,
                value: '300+',
                title: 'Subject',
            },
            {
                image: images.aboutUs2,
                value: '1,000,000+',
                title: 'Lession in 2021',
            },
            {
                image: images.aboutUs3,
                value: '65,000+',
                title: 'Trusted Instructors',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img src={images.image} alt="header" />
            </div>

            <Container className={cx('container')}>
                <Row>
                    <Col className={cx('container__header')}>
                        <p>Learning That Works</p>
                        <span>
                            One-to-one learning works. We’ve believed that from day one. But we also knew it would work
                            better if it were accessible, affordable, and more convenient for everyone. So that’s what
                            we’ve built—an easier way to connect people who need to know with the experts that can teach
                            them. And we’ve changed the way people think about education in the process.
                        </span>
                    </Col>
                </Row>

                <Row>
                    <Col className={cx('container__button')}>
                        <Button to={config.routes.findTutor}>
                            <button>FIND A TUTOR</button>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    {infors.map((infor, index) => {
                        return (
                            <Col key={index} lg="4" className={cx('container__information')}>
                                <div className="text-center">
                                    <h1>{infor.value}</h1>
                                    <h3>{infor.title}</h3>
                                </div>
                                <img src={infor.image} alt={infor.title}></img>
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Col className={cx('container__difference')}>
                        <h1>We Make A Difference</h1>
                    </Col>
                </Row>

                <Row>
                    {steps.map((step, index) => {
                        return (
                            <Col key={index} className={cx('container__different')}>
                                <img src={step.image} alt={step.title}></img>
                                <p>{step.summary}</p>
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Col className={cx('container__button')}>
                        <Button to={config.routes.onlineTutoring}>
                            <button>GET STARTED</button>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col className={cx('container__booking')}>
                        <p>Connect with an Expert Anywhere in the Country</p>
                        <span>Book your online lesson now.</span>
                        <Search width={'910px'}></Search>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AboutUs;
