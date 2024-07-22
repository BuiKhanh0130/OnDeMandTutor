import { useState } from 'react';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';

import Content from './Content';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Feedback.module.scss';
import AboutTutor from './AboutTutor/AboutTutor';

const cx = classNames.bind(styles);
const SEND_FEEDBACK_URL = 'feedback/create_feedback';

function Feedback() {
    const requestPrivates = useRequestsPrivate();
    const [stars, setStars] = useState(1);
    const [description, setDescription] = useState('');

    //handle dsc
    const handleDsc = (e) => {
        setDescription(e.target.value);
    };
    //handle send feedback
    const sendFeedback = async () => {
        try {
            const response = await requestPrivates.post(
                SEND_FEEDBACK_URL,
                JSON.stringify({
                    title: 'feedback',
                    description,
                    tutorId: 'a1ae08d4-4afe-4f90-b950-3696c0473395',
                    classId: 'f011477a-429c-471f-a334-c3de872e9352',
                }),
            );

            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Content stars={stars} setStars={setStars} handleDsc={handleDsc} sendFeedback={sendFeedback} />
                    <AboutTutor />
                </Row>
            </Container>
        </div>
    );
}

export default Feedback;
