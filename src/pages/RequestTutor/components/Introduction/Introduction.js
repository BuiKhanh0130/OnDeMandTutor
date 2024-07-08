import classNames from 'classnames/bind';

import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Introduction.module.scss';

const cx = classNames.bind(styles);

function Introduction() {
    return (
        <Col lg="4" className={cx('requestTutor__container-header')}>
            <div>
                <h1>Tell Us More</h1>
                <p>The following information will be shared with our network of experts.</p>
            </div>
            <div className={cx('requestTutor__container-rule')}>
                <div className={cx('requestTutor__container-rule-dcs')}>
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    <p>
                        Use neutral language, free of biases or discrimination. Avoid using language that is
                        discriminatory in terms of gender, race, religion, etc.
                    </p>
                </div>
                <div className={cx('requestTutor__container-rule-dcs')}>
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    <p>
                        Write in an objective tone, avoiding emotional language or overly persuasive rhetoric. The goal
                        is to provide clear information, not to "sell" the product or service.
                    </p>
                </div>
            </div>
        </Col>
    );
}

export default Introduction;
