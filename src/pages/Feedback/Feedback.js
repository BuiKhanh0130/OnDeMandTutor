import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';

import Content from './Content';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Feedback.module.scss';
import AboutTutor from './AboutTutor/AboutTutor';
import { useNavigate } from 'react-router-dom';
import { ModalNotConfirm } from '~/components/Modal';

const cx = classNames.bind(styles);
const SEND_FEEDBACK_URL = 'feedback/create_feedback';
const GET_TUTOR_URL = 'account/tutorid_by_accountid';

function Feedback() {
    const requestPrivates = useRequestsPrivate();
    const navigate = useNavigate();
    const [stars, setStars] = useState(1);
    const [description, setDescription] = useState('');
    const [tutorId, setTutorId] = useState('');
    const [showModal, setShowModal] = useState(false);
    //getTutorId
    useEffect(() => {
        const url = window.location.href;
        const userId = url.split('/')[4];
        const getTutorId = async () => {
            try {
                const response = await requestPrivates.get(GET_TUTOR_URL, { params: { accountId: userId } });
                setTutorId(response.data);
            } catch (error) {
                console.lof(error);
            }
        };
        getTutorId();
    }, []);
    //handle dsc
    const handleDsc = (e) => {
        setDescription(e.target.value);
    };
    //handle send feedback
    const sendFeedback = async () => {
        const url = window.location.href;
        const classId = url.split('/')[5];
        try {
            const response = await requestPrivates.post(
                SEND_FEEDBACK_URL,
                JSON.stringify({
                    title: 'feedback',
                    description,
                    tutorId,
                    classId,
                }),
            );
            if (response.status === 200) {
                handleShowModal();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Content stars={stars} setStars={setStars} handleDsc={handleDsc} sendFeedback={sendFeedback} />
                    <AboutTutor tutorId={tutorId} />
                </Row>
                <ModalNotConfirm
                    showModal={showModal}
                    handleCancel={handleCancel}
                    content="Thank to your feedback!"
                    typeError="Success"
                />
            </Container>
        </div>
    );
}

export default Feedback;
