import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SuggestedAccounts from './components/SuggestAccounts';
import images from '~/assets/images';
import Image from '~/components/Image';
import { HomeIcon } from '~/components/Icons';
import Search from '~/components/Search';
import Button from '~/components/Button';

import styles from './Advertisement.module.scss';

const cx = classNames.bind(styles);

function Advertisement() {
    const [suggests, setSuggests] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

    useEffect(() => {
        setSuggests([
            {
                id: 1,
                img: images.avatar,
                name: 'Nguyen Thanh Phong',
                subject: 'English/Writing/Reading/Study Habits Tutor',
            },
            {
                id: 1,
                img: images.avatar,
                name: 'Nguyen Thanh Phong',
                subject: 'English/Writing/Reading/Study Habits Tutor',
            },
            {
                id: 1,
                img: images.avatar,
                name: 'Nguyen Thanh Phong',
                subject: 'English/Writing/Reading/Study Habits Tutor',
            },
            {
                id: 1,
                img: images.avatar,
                name: 'Nguyen Thanh Phong',
                subject: 'English/Writing/Reading/Study Habits Tutor',
            },
            {
                id: 1,
                img: images.avatar,
                name: 'Nguyen Thanh Phong',
                subject: 'English/Writing/Reading/Study Habits Tutor',
            },
        ]);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row className={cx('container__main')}>
                    <Col lg="4" className={cx('container__sidebar')}>
                        <div className={cx('container__sidebar-home', 'active')}>
                            <HomeIcon
                                currentColor={'rgb(254, 44, 85)'}
                                className={cx('container__sidebar-home-icon')}
                            ></HomeIcon>
                            <span>For You</span>
                        </div>

                        <div className={cx('container__sidebar-search')}>
                            <Search className={cx('container__sidebar-search-input')} width="300px"></Search>
                        </div>

                        <div className={cx('container__sidebar-suggested')}>
                            <p className={cx('container__sidebar-suggested-label')}>Suggested Account</p>
                            {suggests.map((suggest, index) => {
                                return <SuggestedAccounts key={index} data={suggest}></SuggestedAccounts>;
                            })}
                            {seeAll ? (
                                <div
                                    className={cx('container__sidebar-suggested-label-see')}
                                    onClick={() => setSeeAll(false)}
                                >
                                    See less
                                </div>
                            ) : (
                                <div
                                    className={cx('container__sidebar-suggested-label-see')}
                                    onClick={() => setSeeAll(true)}
                                >
                                    See all
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg="8" className={cx('container__video')}>
                        <div className={cx('container__tag-video')}>
                            <Row className={cx('container__video-user')}>
                                <Col lg="1">
                                    <Image src={images.avatar} alt={'NTP'}></Image>
                                </Col>
                                <Col lg="9" className={cx('container__video-user-summary')}>
                                    <span>Nguyen Thanh Phong</span>
                                    <p>English/Writing/Reading/Study Habits Tutor</p>
                                    <p>
                                        Michael has taught my son since this summer. He is very experienced and
                                        knowledgeable. He keeps his lesson effective, engaging and fun. My son is able
                                        to stay focus and overcome his fear of writing. We definitely plan to keep
                                        working with Michael.
                                    </p>
                                </Col>
                                <Col lg="2">
                                    <Button orange to={'/'} className={cx('container__video-user-btn')}>
                                        Connect with Phong
                                    </Button>
                                </Col>
                            </Row>
                            <div className={cx('container__clip')}>
                                <section>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/abPmZCZZrFA?si=r_a2yaVe8RGKhNuK"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowfullscreen
                                    ></iframe>
                                </section>
                            </div>
                        </div>

                        <div className={cx('container__tag-video')}>
                            <Row className={cx('container__video-user')}>
                                <Col lg="1">
                                    <Image src={images.avatar} alt={'NTP'}></Image>
                                </Col>
                                <Col lg="9" className={cx('container__video-user-summary')}>
                                    <span>Nguyen Thanh Phong</span>
                                    <p>English/Writing/Reading/Study Habits Tutor</p>
                                    <p>
                                        Michael has taught my son since this summer. He is very experienced and
                                        knowledgeable. He keeps his lesson effective, engaging and fun. My son is able
                                        to stay focus and overcome his fear of writing. We definitely plan to keep
                                        working with Michael.
                                    </p>
                                </Col>
                                <Col lg="2">
                                    <Button orange to={'/'} className={cx('container__video-user-btn')}>
                                        Connect with Phong
                                    </Button>
                                </Col>
                            </Row>
                            <div className={cx('container__clip')}>
                                <section>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/abPmZCZZrFA?si=r_a2yaVe8RGKhNuK"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowfullscreen
                                    ></iframe>
                                </section>
                            </div>
                        </div>

                        <div className={cx('container__tag-video')}>
                            <Row className={cx('container__video-user')}>
                                <Col lg="1">
                                    <Image src={images.avatar} alt={'NTP'}></Image>
                                </Col>
                                <Col lg="9" className={cx('container__video-user-summary')}>
                                    <span>Nguyen Thanh Phong</span>
                                    <p>English/Writing/Reading/Study Habits Tutor</p>
                                    <p>
                                        Michael has taught my son since this summer. He is very experienced and
                                        knowledgeable. He keeps his lesson effective, engaging and fun. My son is able
                                        to stay focus and overcome his fear of writing. We definitely plan to keep
                                        working with Michael.
                                    </p>
                                </Col>
                                <Col lg="2">
                                    <Button orange to={'/'} className={cx('container__video-user-btn')}>
                                        Connect with Phong
                                    </Button>
                                </Col>
                            </Row>
                            <div className={cx('container__clip')}>
                                <section>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/abPmZCZZrFA?si=r_a2yaVe8RGKhNuK"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowfullscreen
                                    ></iframe>
                                </section>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Advertisement;
