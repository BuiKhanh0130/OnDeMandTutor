import classNames from 'classnames/bind';

import { ModalContext } from '~/components/ModalProvider';
import { EmailIcon, BanIcon, ComplaintIcon } from '~/components/Icons';

import { Container, Row, Col } from 'react-bootstrap';

import styles from './Cards.module.scss';
import { useContext, useMemo } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Cards() {
    const { setSendEmail, setListTutor, setComplaintModerator } = useContext(ModalContext);
    const handleSendEmail = () => {
        setSendEmail(true);
    };

    const handleListTutor = () => {
        setListTutor(true);
    };

    const handleComplaintModerator = () => {
        setListTutor(false);
        setComplaintModerator(true);
    };

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="4">
                    <Button className={cx('container__card')} onClick={handleSendEmail}>
                        <span>Send Email</span>
                        <EmailIcon className={cx('container__card-icon')} />
                    </Button>
                </Col>
                <Col lg="4">
                    <Button className={cx('container__card')} onClick={handleListTutor}>
                        <span>Tutor Intern</span>
                        <BanIcon className={cx('container__card-icon')} />
                    </Button>
                </Col>
                <Col lg="4">
                    <Button className={cx('container__card')} onClick={handleComplaintModerator}>
                        <span>Complaints</span>
                        <ComplaintIcon className={cx('container__card-icon')} />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Cards;
