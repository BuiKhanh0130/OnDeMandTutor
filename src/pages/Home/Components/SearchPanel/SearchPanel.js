import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { ReactTyped } from 'react-typed';

import { SearchIcon, TrendingIcon } from '~/components/Icons';
import Button from '~/components/Button';
import images from '~/assets/images';
import Image from '~/components/Image';

import styles from './SearchPanel.module.scss';

const cx = classNames.bind(styles);

function SearchPanel({ trends }) {
    return (
        <div className={cx('SearchPanel')}>
            <div className={cx('SearchPanel_left')}>
                <h1 className={cx('SearchPanel_left-title')}>
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
                <div className={cx('SearchPanel_left-search')}>
                    <input
                        type="text"
                        className={cx('SearchPanel_left-search-ip')}
                        placeholder="What would you like to learn?"
                    ></input>
                    <Button orange small className={cx('SearchPanel_left-search-ic')}>
                        <SearchIcon />
                    </Button>
                </div>
                <div className={cx('SearchPanel_left-trending')}>
                    <div className={cx('SearchPanel_left-trending-label')}>
                        <TrendingIcon />
                        <span>Trending:</span>
                    </div>
                    {trends.map((trending, index) => {
                        return (
                            <Fragment key={index}>
                                <Button small className={cx('SearchPanel_left-trending-btn')}>
                                    {trending}
                                </Button>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
            <div className={cx('SearchPanel_right')}>
                <Image src={images.search} alt={'overview'}></Image>
            </div>
        </div>
    );
}

export default SearchPanel;
