import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from '~/components/Button';

import styles from './ApplyTutor.module.scss';

const cx = classNames.bind(styles);

function ApplyTutor({ applyTutor }) {
    return (
        <Row className={cx('wrapper')}>
            <Col className={cx('applyTutor__container')}>
                {applyTutor.map((apply, index) => {
                    return (
                        <div key={index} className={cx('applyTutor__container-content')}>
                            <div className={cx('applyTutor__container-title')}>{apply.title}</div>
                            <div className={cx('applyTutor__container-summary')}>{apply.summary}</div>
                            <Button transparent className={cx('applyTutor__container-btn')}>
                                {apply.button}
                            </Button>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default ApplyTutor;
