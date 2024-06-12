import classNames from 'classnames/bind';
import { useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';

import styles from './OnlineTutoring.module.scss';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

function OnlineTutoring() {
    const steps = useMemo(
        () => [
            {
                title: 'MEET 1–TO–1',
                image: images.chat,
                summary:
                    'Interactive features and video chat make collaborating so easy, it’ll feel like you’re in the same room.',
            },
            {
                title: 'SAVE TIME',
                image: images.schedule,
                summary:
                    'Skip the planning and travel. Work any time, from anywhere, to easily fit lessons into your busy schedule.',
            },
            {
                title: 'STRESS LESS',
                image: images.map,
                summary:
                    'Find the right person to help you reach your goals–no matter where you live, or what you want to learn.',
            },
        ],
        []
    );
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col className={cx('container__header')}>
                        <p>Introducing the On demand Tutor Learning Studio</p>
                        <span>Get the 1–to–1 help you need without ever leaving the house.</span>
                    </Col>
                </Row>
                <Row>
                    <Col className={cx('container__video')}>
                        <section>
                            <iframe
                                width="900"
                                height="400"
                                title="Example website content"
                                frameBorder="0"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            ></iframe>
                        </section>
                    </Col>
                </Row>
                <Row>
                    {steps.map((step, index) => {
                        return (
                            <Col lg="4" key={index} className={cx('container__instruction')}>
                                <Image src={step.image} alt={step.title}></Image>
                                <span>{step.title}</span>
                                <p>{step.summary}</p>
                            </Col>
                        );
                    })}
                </Row>
                <Row>
                    <Col className={cx('container__booking')}>
                        <p>Connect with an Expert Anywhere in the Country</p>
                        <span>Book your online lesson now.</span>
                        <Search></Search>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default OnlineTutoring;
