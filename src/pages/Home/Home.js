import classNames from 'classnames/bind';
import { useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import images from '~/assets/images';
import SearchPanel from './components/SearchPanel';
import LessonPanel from './components/LessonPanel';
import SubjectPanel from './components/SubjectPanel';
import UniversityPanel from './components/UniversityPanel';
import RentPanel from './components/RentPanel';
import GreatPanel from './components/GreatPanel';
import ApplyTutor from './components/ApplyTutor';

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

    const applyTutor = useMemo(
        () => [
            {
                title: 'Looking to tutor with On Demand Tutor?',
                summary: `We're always looking for talented tutors. Set your own rate, get paid and make a difference`,
                button: 'Apply now',
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <Container>
                <SearchPanel trends={trends} />
                <LessonPanel judgments={judgments} />
                <SubjectPanel subjects={subjects} />
                <UniversityPanel universities={universities} />
                <RentPanel rents={rents} />
                <ApplyTutor applyTutor={applyTutor} />
                <GreatPanel greatTutors={greatTutors} />
            </Container>
        </div>
    );
}

export default Home;
