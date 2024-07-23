import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';

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
import request from '~/utils/request';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const TUTOR_URL = 'tutor';

function Home() {
    const [pagination, setPagination] = useState({ limit: 0 });
    const [lengthArray, setLength] = useState(0);
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
                number: pagination.limit === 0 ? lengthArray : 5 * (pagination.limit - 1) + lengthArray,
            },
            {
                title: '5-star tutor reviews',
                number: '300,000+',
            },
            {
                title: 'Subjects taught',
                number: '12+',
            },
            {
                title: 'Tutor nationalities',
                number: '1+',
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
                        content: `Sociology is the study of human society, social behavior, and social interactions. It examines how social structures, institutions, and processes shape people's lives and influence human behavior. Sociologists investigate diverse topics such as social class, gender, race, religion, education, and culture to understand the complexities of the social world.`,
                    },
                    {
                        label: 'Physics',
                        icon: images.physic,
                        content: `Physics is the fundamental scientific study of matter, energy, and their interactions. It seeks to understand the nature of the universe, from the smallest subatomic particles to the largest celestial bodies. Physics encompasses a wide range of topics, including mechanics, electromagnetism, thermodynamics, quantum mechanics, and astrophysics, providing a comprehensive framework for explaining the physical world around us.`,
                    },
                    {
                        label: 'Natural science',
                        icon: images.natural,
                        content: `Natural Science is the study of the physical and natural world, including the phenomena and processes that govern the universe. It encompasses a diverse range of disciplines, such as biology, chemistry, physics, astronomy, geology, and environmental science, among others. Natural Science aims to understand the laws and principles that govern the natural world through systematic observation, experimentation, and the application of scientific methods.`,
                    },
                    {
                        label: 'Primary School',
                        icon: images.primary,
                        content: `Primary School is the initial stage of formal education, typically covering the early years of a child's schooling from approximately ages 5 to 11. During this stage, children develop fundamental academic skills in subjects like reading, writing, mathematics, and basic sciences. Primary School also focuses on fostering social, emotional, and physical development, laying a strong foundation for future learning and personal growth.`,
                    },
                    {
                        label: 'Secondary School',
                        icon: images.secondary,
                        content: `Secondary School is the stage of formal education that follows Primary School, typically covering the teenage years from approximately ages 11 to 18. At this level, students build upon their foundational knowledge and skills, delving deeper into a wide range of academic subjects, including humanities, sciences, and electives. Secondary School aims to prepare students for higher education, vocational training, or the workforce, while also promoting personal development, critical thinking, and civic responsibility.`,
                    },
                    {
                        label: 'High school',
                        icon: images.high,
                        content: `High School is the final stage of secondary education, typically covering grades 9 through 12 for students aged approximately 14 to 18. During this period, students take a diverse range of courses in academic subjects such as English, mathematics, science, social studies, and electives. High School emphasizes the development of essential skills, including critical thinking, problem-solving, communication, and collaboration, while also providing opportunities for extracurricular activities, personal growth, and college or career preparation.`,
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

    useEffect(() => {
        const handleChange = async () => {
            try {
                const response = await request.get(TUTOR_URL);
                setPagination({
                    limit: response.data.limitPage,
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        handleChange();
    });

    //get length
    useEffect(() => {
        const handleChange = async () => {
            try {
                const response = await request.get(TUTOR_URL, { params: { pageIndex: pagination.limit } });
                setLength(response.data.listResult.length);
            } catch (error) {
                console.log(error.message);
            }
        };
        handleChange();
    }, [pagination.limit]);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <SearchPanel trends={trends} />
                <LessonPanel judgments={judgments} />
                <SubjectPanel subjects={subjects} />
                <UniversityPanel universities={universities} />
                <RentPanel rents={rents} />
                <ApplyTutor applyTutor={applyTutor} />
                <GreatPanel />
            </Container>
        </div>
    );
}

export default Home;
