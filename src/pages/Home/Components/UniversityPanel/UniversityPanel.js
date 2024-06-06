import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';

import styles from './UniversityPanel.module.scss';

const cx = classNames.bind(styles);

function UniversityPanel({ universities }) {
    return (
        <Row className={cx('wrapper')}>
            <Col>
                {universities.map((universityChildren, index) => {
                    return (
                        <div key={index} className={cx('universityPanel__container')}>
                            <div className={cx('universityPanel__container-title')}>{universityChildren.title}</div>
                            <div className={cx('universityPanel__container-items')}>
                                {universityChildren.images.map((image, index) => {
                                    return <Image key={index} src={image} alt="#"></Image>;
                                })}
                            </div>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default UniversityPanel;
