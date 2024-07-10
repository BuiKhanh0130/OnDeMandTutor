import { useState } from 'react';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import Button from '~/components/Button';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import Introduction from '../RequestTutor/components/Introduction';

import styles from './GenerateClass.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const GENERATE_CLASS_URL = 'Classes/createClass';

function CreateClass() {
    const { state } = useLocation();
    const formId = state.formId;
    const requestPrivates = useRequestsPrivate();
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');

    const handleGenerateClass = async () => {
        console.log(JSON.stringify({ className, description, formId }));
        const response = await requestPrivates.post(
            GENERATE_CLASS_URL,
            JSON.stringify({ className, description, formId }),
        );

        console.log(response.status);
    };
    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="8" className={cx('class__container')}>
                    <div className={cx('form')}>
                        <div className={cx('tutor__subject')}>
                            <label id="className">Name class</label>
                            <input type="text" id="className" onChange={(e) => setClassName(e.target.value)}></input>
                        </div>
                        <div className={cx('tutor__grade')}>
                            <textarea
                                type="text"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <Button className={cx('submit')} onClick={handleGenerateClass}>
                            Submit
                        </Button>
                    </div>
                </Col>
                <Introduction />
            </Row>
        </Container>
    );
}

export default CreateClass;
