import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './RequestTutor.module.scss';

const cx = classNames.bind(styles);

function RequestTutor() {
    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="8" className={cx('requestTutor__container')}>
                    <form className={cx('requestTutor__container-body')}>
                        <div className={cx('requestTutor__container-subject')}>
                            <label htmlFor="subjects">Subject</label>
                            <select id="subjects" name="subjects">
                                <option value="math">Math</option>
                                <option value="math">Math</option>
                                <option value="math">Math</option>
                                <option value="math">Math</option>
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-grade')}>
                            <label htmlFor="grades">Grade</label>
                            <select id="grades" name="grades">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">12</option>
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-gender')}>
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender">
                                <option value="lady">Lady</option>
                                <option value="gentlemen">Gentlemen</option>
                            </select>
                        </div>

                        <div className={cx('requestTutor__container-dcs')}>
                            <p>Send a personal note</p>
                            <textarea
                                id="my-textarea"
                                rows="5"
                                cols="30"
                                placeholder="Enter your text here..."
                            ></textarea>
                        </div>
                        <input className={cx('requestTutor__container-submit')} type="submit" value="Submit"></input>
                    </form>
                </Col>
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
                                Write in an objective tone, avoiding emotional language or overly persuasive rhetoric.
                                The goal is to provide clear information, not to "sell" the product or service.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RequestTutor;
