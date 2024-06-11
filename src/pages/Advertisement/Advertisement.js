import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Search from '~/components/Search';
import Video from './components/Video';
import SuggestedAccounts from './components/SuggestAccounts';
import { HomeIcon } from '~/components/Icons';

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
                            <Search className={cx('container__sidebar-search-input')} width="300px" />
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
                    <Col lg="8">
                        <Video />
                        <Video />
                        <Video />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Advertisement;
