import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { useMemo } from 'react';
import { ReactTyped } from 'react-typed';

import { SearchIcon, TrendingIcon } from '~/component/Icons';
import Button from '~/component/Button';
import images from '~/assets/images';
import Image from '~/component/Image';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const trends = useMemo(
        () => [
            'English',
            'PHP',
            'Spanish',
            'Poker',
            'Geography',
            'Chemistry',
            'Vietnamese',
            'Math',
            'Japanese',
            'Literature',
            'JavaScript',
            'C#',
            'ASP C#',
        ],
        [],
    );

    const judgments = useMemo(
        () => [
            {
                title: 'Experienced tutor',
                number: '32,000+',
            },
            {
                title: '5-star tutor reviews',
                number: '300,000+',
            },
            {
                title: 'Subjects taught',
                number: '120+',
            },
            {
                title: 'Tutor nationalities',
                number: '10+',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                <div className={cx('LessonPanel')}>
                    {judgments.map((judgment) => {
                        return (
                            <div className={cx('LessonPanel_items')}>
                                <div className={cx('LessonPanel_items-number')}>{judgment.number}</div>
                                <div className={cx('LessonPanel_items-title')}>{judgment.title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
