import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Form from './components/Form';
import Introduction from './components/Introduction';

import styles from './RequestTutor.module.scss';

const cx = classNames.bind(styles);

function RequestTutor() {
    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Form />
                <Introduction />
            </Row>
        </Container>
    );
}

export default RequestTutor;
