import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';

import styles from './SubjectPanel.module.scss';

const cx = classNames.bind(styles);

function LessonPanel({ subjects }) {
    return (
        <Row className={cx('wrapper')}>
            <Col>
                {subjects.map((subjectChildren, index) => {
                    return (
                        <div key={index} className={cx('subjectPanel__container')}>
                            <div className={cx('subjectPanel__container-title')}>{subjectChildren.title}</div>
                            <div className={cx('subjectPanel__container-items')}>
                                {subjectChildren.items.map((subject, index) => {
                                    return (
                                        <div key={index} className={cx('subjectPanel__container-item')}>
                                            <Image src={subject.icon} alt={subject.label} />
                                            <span>{subject.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default LessonPanel;
