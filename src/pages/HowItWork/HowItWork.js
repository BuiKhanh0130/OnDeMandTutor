import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './HowItWork.module.scss';

const cx = classNames.bind(styles);

function HowItWork() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg="4">
                        <p>Grow your tutoring business</p>
                    </Col>
                    <Col lg="8">
                        <p>
                            Whether you’re new to tutoring or an established pro, listing your services on demand tutor
                            is the most effective way to build and manage your own successful tutoring business.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HowItWork;
