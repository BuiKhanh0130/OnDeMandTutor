import classNames from 'classnames/bind';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';

import styles from './RentPanel.module.scss';

const cx = classNames.bind(styles);

function RentPanel({ rents }) {
    return (
        <Row className={cx('wrapper')}>
            <Col>
                {rents.map((rentChildren, index) => {
                    return (
                        <div key={index} className={cx('rentPanel__container')}>
                            <div className={cx('rentPanel__container-title')}>{rentChildren.title}</div>
                            <Row className={cx('rentPanel__container-items')}>
                                <Col lg="4" className={cx('rentPanel__container-items-img')}>
                                    <Image src={rentChildren.image} alt={rentChildren.title}></Image>
                                </Col>
                                <Col lg="8" className={cx('rentPanel__container-items-dsc')}>
                                    {rentChildren.steps.map((items, index) => {
                                        return (
                                            <div key={index} className={cx('rentPanel__container-items-content')}>
                                                <p>{items.label}</p>
                                                <span>{items.content}</span>
                                            </div>
                                        );
                                    })}
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
}

export default RentPanel;
