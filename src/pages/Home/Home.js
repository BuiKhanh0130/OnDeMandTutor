import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { useMemo, useEffect, useState, useRef } from 'react';
import { ReactTyped } from 'react-typed';

import { SearchIcon, TrendingIcon } from '~/component/Icons';
import Button from '~/component/Button';
import images from '~/assets/images';
import Image from '~/component/Image';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const nodeRef = useRef();
    const nodeRef2 = useRef();

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

    const subjects = useMemo(
        () => [
            {
                title: 'Diverse subjects',
                items: [
                    {
                        label: 'Sociology',
                        icon: images.sociology,
                    },
                    {
                        label: 'Physics',
                        icon: images.physic,
                    },
                    {
                        label: 'Natural science',
                        icon: images.natural,
                    },
                    {
                        label: 'Primary School',
                        icon: images.primary,
                    },
                    {
                        label: 'Secondary School',
                        icon: images.secondary,
                    },
                    {
                        label: 'High school',
                        icon: images.high,
                    },
                ],
            },
        ],
        [],
    );

    const universities = useMemo(
        () => [
            {
                title: 'Tutor from the universities',
                images: [images.BK, images.HUB, images.FPT, images.UIT, images.NT],
            },
        ],
        [],
    );

    const rents = useMemo(
        () => [
            {
                title: 'Finding the perfect tutor is easy',
                image: images.rentTutor,
                steps: [
                    {
                        label: '1. Choose from courses in Math, Science, English, or Computer Science',
                        content:
                            'Online tutoring is available to primary and secondary students preparing for the SEA and CSEC examinations. Choose from subjects in Math, Science, English, or Computer Science.',
                    },
                    {
                        label: '2. Get Matched With Your 1:1 Rent My Tutor Instructor',
                        content:
                            'Our tutors are carefully selected, university-trained educators who will guide learners through our curriculum, at the learner of space and style.',
                    },
                    {
                        label: '3. Receive Weekly Instructor Feedback',
                        content:
                            'Weekly updates and instructor feedback will be shared withparents after each 50-minute class. There will be an on going teacher-parent dialogue as learners go through their learning Journey.',
                    },
                ],
            },
        ],
        [],
    );

    const greatTutors = useMemo(
        () => [
            {
                title: 'Your next great tutor',
                summary: 'Enjoy one-on-one instruction from the nation of biggest network of independent experts.',
                subjects: [
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                    {
                        avatar: images.avatar,
                        label: 'AMAZING TUTOR',
                        content: `Tiffany has exceeded our expectations. She is knowledgeable, patient, and fun. All the lessons are thoughtfully prepared. And she has such a great personality! Our 5 year old son enjoys every lesson with her and he is actually engaged for the whole hour. I'm honestly impressed. She is the best!
                Joanna, 16 lessons with Tiffany`,
                        level: 'Elementary Reading Tutor',
                    },
                ],
            },
        ],
        [],
    );

    useEffect(() => {
        const currentScroll = '.' + nodeRef.current.className;
        const GreatTutorPanel_animation = '.' + nodeRef2.current.className;

        const scrollers = document.querySelectorAll(currentScroll);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', true);

                const scrollerInner = scroller.querySelector(GreatTutorPanel_animation);
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute('aria-hidden', true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

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
                <div className={cx('SubjectPanel')}>
                    {subjects.map((subjectChildren) => {
                        return (
                            <div className={cx('SubjectPanel-container')}>
                                <div className={cx('SubjectPanel-title')}>{subjectChildren.title}</div>
                                <div className={cx('SubjectPanel-items')}>
                                    {subjectChildren.items.map((subject) => {
                                        return (
                                            <div className={cx('SubjectPanel-item')}>
                                                <Image src={subject.icon} alt={subject.label} />
                                                <span>{subject.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('UniversityPanel')}>
                    {universities.map((universityChildren) => {
                        return (
                            <div className={cx('UniversityPanel-container')}>
                                <div className={cx('UniversityPanel-title')}>{universityChildren.title}</div>
                                <div className={cx('UniversityPanel-items')}>
                                    {universityChildren.images.map((image) => {
                                        return <Image src={image} alt="#"></Image>;
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('RentPanel')}>
                    {rents.map((rentChildren) => {
                        return (
                            <div className={cx('RentPanel-container')}>
                                <div className={cx('RentPanel-title')}>{rentChildren.title}</div>
                                <div className={cx('RentPanel-items')}>
                                    <div className={cx('RentPanel-items-left')}>
                                        <Image src={rentChildren.image} alt={rentChildren.title}></Image>
                                    </div>
                                    <div className={cx('RentPanel-items-right')}>
                                        {rentChildren.steps.map((items) => {
                                            return (
                                                <div className={cx('RentPanel-items-right-content')}>
                                                    <p>{items.label}</p>
                                                    <span>{items.content}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={cx('GreatTutorPanel')}>
                    {greatTutors.map((greatTutorChildren, index) => {
                        return (
                            <div key={index} className={cx('GreatTutorPanel-container')}>
                                <div className={cx('GreatTutorPanel-title')}>{greatTutorChildren.title}</div>
                                <div className={cx('GreatTutorPanel-summary')}>{greatTutorChildren.summary}</div>

                                <div className={cx('scroller')} ref={nodeRef} ata-direction={'left'}>
                                    <div className={cx('GreatTutorPanel-animation')} ref={nodeRef2}>
                                        {greatTutorChildren.subjects.map((subject, index) => {
                                            return (
                                                <div className={cx('GreatTutorPanel_subjects')}>
                                                    <div className={cx('GreatTutorPanel_subjects-left')}>
                                                        <Image src={subject.avatar} alt={'#'}></Image>
                                                    </div>
                                                    <div className={cx('GreatTutorPanel_subjects-right')}>
                                                        <p className={cx('GreatTutorPanel_subjects-right-label')}>
                                                            {subject.label}
                                                        </p>
                                                        <p className={cx('GreatTutorPanel_subjects-right-content')}>
                                                            {subject.content}
                                                        </p>
                                                        <p className={cx('GreatTutorPanel_subjects-right-level')}>
                                                            {subject.level}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={cx('scroller')} ref={nodeRef} data-direction={'right'}>
                                    <div className={cx('GreatTutorPanel-animation')} ref={nodeRef2}>
                                        {greatTutorChildren.subjects.map((subject, index) => {
                                            return (
                                                <div className={cx('GreatTutorPanel_subjects')}>
                                                    <div className={cx('GreatTutorPanel_subjects-left')}>
                                                        <Image src={subject.avatar} alt={'#'}></Image>
                                                    </div>
                                                    <div className={cx('GreatTutorPanel_subjects-right')}>
                                                        <p className={cx('GreatTutorPanel_subjects-right-label')}>
                                                            {subject.label}
                                                        </p>
                                                        <p className={cx('GreatTutorPanel_subjects-right-content')}>
                                                            {subject.content}
                                                        </p>
                                                        <p className={cx('GreatTutorPanel_subjects-right-level')}>
                                                            {subject.level}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
