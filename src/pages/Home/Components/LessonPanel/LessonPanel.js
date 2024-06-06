import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './LessonPanel.module.scss';

const cx = classNames.bind(styles);

function LessonPanel({ judgments }) {
    return (
        <Row className={cx('wrapper')}>
            <Col className={cx('lessonPanel__container')}>
                {judgments.map((judgment, index) => {
                    return (
                        <div key={index} className={cx('lessonPanel__container-items')}>
                            <div className={cx('lessonPanel__container-items-number')}>{judgment.number}</div>
                            <div className={cx('lessonPanel__container-items-title')}>{judgment.title}</div>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default LessonPanel;
