import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Search from '~/components/Search';
import Video from './components/Video';
import SuggestedAccounts from './components/SuggestAccounts';
import { HomeIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Advertisement.module.scss';

const cx = classNames.bind(styles);
const ACCOUNTS_URL = '/account/show_tutor_have_ads';
const ALL_ADVERSTISEMENT_URL = '/account/show_tutor_have_ads';

function Advertisement() {
    const [seeAll, setSeeAll] = useState(false);
    const [accountNumber, setAccountNumber] = useState(5);
    const [advertisements, setAdvertisements] = useState();

    const requestsPrivate = useRequestsPrivate();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAccount = async () => {
            const response = await requestsPrivate.get(ALL_ADVERSTISEMENT_URL, { signal: controller.signal });
            isMounted && setAccounts(response.data);
        };

        getAccount();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAccount = async () => {
            const response = await requestsPrivate.get(ACCOUNTS_URL, { signal: controller.signal });
            console.log(response.data);
            isMounted && setAdvertisements(response.data);
        };

        getAccount();

        return () => {
            isMounted = false;
            controller.abort();
        };
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
                            <Search className={cx('container__sidebar-search-input')} width="420px" />
                        </div>

                        <div className={cx('container__sidebar-suggested')}>
                            <p className={cx('container__sidebar-suggested-label')}>Suggested Account</p>
                            {accounts?.length > 0 &&
                                accounts.slice(0, accountNumber).map((suggest, index) => {
                                    return <SuggestedAccounts key={index} data={suggest}></SuggestedAccounts>;
                                })}
                            {seeAll ? (
                                <div
                                    className={cx('container__sidebar-suggested-label-see')}
                                    onClick={() => {
                                        setSeeAll(false);
                                        setAccountNumber(5);
                                    }}
                                >
                                    See less
                                </div>
                            ) : (
                                <div
                                    className={cx('container__sidebar-suggested-label-see')}
                                    onClick={() => {
                                        setSeeAll(true);
                                        setAccountNumber(accounts.length);
                                    }}
                                >
                                    See more
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg="8">
                        {advertisements?.length === 0 ? (<p style={{ fontSize: '3rem', color: 'red' }}>There no advertisement</p>) :
                            advertisements.map((advertisement) => {
                                return (
                                    <Video
                                        key={advertisement.accountId}
                                        accountId={advertisement.accountId}
                                        tutorId={advertisement.tutorId}
                                        avatar={advertisement.avatar}
                                        name={advertisement.fullName}
                                        headline={advertisement.headline}
                                        clip={advertisement?.tutorAds[0].videoUrl}
                                        description={advertisement.description}
                                    />
                                );
                            })
                        }

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Advertisement;
