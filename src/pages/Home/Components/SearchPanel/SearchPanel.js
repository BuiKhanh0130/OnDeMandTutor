import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { ReactTyped } from 'react-typed';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TrendingIcon } from '~/components/Icons';
import Button from '~/components/Button';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '~/components/Search';

import styles from './SearchPanel.module.scss';

const cx = classNames.bind(styles);

function SearchPanel({ trends }) {
    return (
        <Row className={cx('wrapper')}>
            <Col lg="8" className={cx('searchPanel__left')}>
                <h1 className={cx('searchPanel__left-title')}>
                    Trust the nation's largest network for
                    <span>
                        <ReactTyped
                            strings={['Chemistry', 'Math', 'JavaScript', 'English', 'Writing']}
                            typeSpeed={150}
                            loop
                            backSpeed={50}
                            showCursor={true}
                        />
                    </span>
                    tutors
                </h1>
                <Search width="660px" />
                <div className={cx('searchPanel__left-trending')}>
                    <div className={cx('searchPanel__left-trending-label')}>
                        <TrendingIcon />
                        <span>Trending:</span>
                    </div>
                    {trends.map((trending, index) => {
                        return (
                            <Fragment key={index}>
                                <Button small className={cx('searchPanel__left-trending-btn')}>
                                    {trending}
                                </Button>
                            </Fragment>
                        );
                    })}
                </div>
            </Col>
            <Col lg="4" className={cx('searchPanel__right')}>
                <Image src={images.search} alt={'overview'}></Image>
            </Col>
        </Row>
    );
}

export default SearchPanel;
