import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Blog.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const FORM_FIND_TUTOR_URL = 'FormFindTutor/tutor/searchpost';
const APPLY_POST_URL = 'FormFindTutor/tutor/applypost';

function Blog() {
    const requestPrivate = useRequestsPrivate();
    const [listClasses, setListClasses] = useState([]);
    const [disable, setDisable] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFormClass = async () => {
            const response = await requestPrivate.get(FORM_FIND_TUTOR_URL, {
                signal: controller.signal,
            });
            isMounted && setListClasses(response.data.listResult);

            return () => {
                isMounted = false;
                controller.abort();
            };
        };

        getFormClass();
    }, []);

    const handleApply = async (id) => {
        const response = await requestPrivate.post(APPLY_POST_URL, id);
        if (response.status === 200) {
            setDisable((prev) => [...prev, id]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                {listClasses.length > 0 &&
                    listClasses.map((classItem, index) => (
                        <Row key={index} className={cx('container__hero')}>
                            <Col lg="8" className={cx('container__card')}>
                                <div className={cx('container__form-control')}>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <div>
                                            <strong>Tittle: </strong>
                                            <span> {classItem.title}</span>
                                        </div>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>Subject: </strong>
                                            <span> {classItem.subjectName}</span>
                                        </div>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>Type of degree: </strong>
                                            <span> {classItem.typeOfDegree}</span>
                                        </div>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>Day start: </strong>
                                            <span> {classItem.dayStart}</span>
                                        </div>
                                        <div className={cx('')}>
                                            <strong>Day end: </strong>
                                            <span> {classItem.dayEnd}</span>
                                        </div>
                                    </div>
                                    <div className={cx('container__form-control-portfolio')}>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>Min price: </strong>
                                            <span> {classItem.minHourlyRate}</span>
                                        </div>
                                        <div className={cx('')}>
                                            <strong>Max price: </strong>
                                            <span> {classItem.maxHourlyRate}</span>
                                        </div>
                                    </div>

                                    <div className={cx('container__form-control-portfolio')}>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>Start: </strong>
                                            <span> {classItem.timeStart}</span>
                                        </div>
                                        <div className={cx('container__form-control-portfolio-items')}>
                                            <strong>End: </strong>
                                            <span> {classItem.timeEnd}</span>
                                        </div>
                                        <div className={cx('')}>
                                            <strong>Day of week: </strong>
                                            <span> {classItem.dayOfWeek}</span>
                                        </div>
                                    </div>

                                    <div className={cx('container__form-control-portfolio')}>
                                        <div>
                                            <strong>Description: </strong>
                                            <span>{classItem.description}</span>
                                        </div>
                                    </div>
                                    {disable.length > 0 && disable.find((id) => id === classItem.formId) ? (
                                        <></>
                                    ) : (
                                        <Button
                                            className={cx('container__form-control-submit')}
                                            onClick={() => {
                                                handleApply(classItem.formId);
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    )}
                                </div>
                            </Col>

                            <Col lg="4" className={cx('container_avatar')}>
                                <Image src={images.avatar} alt="NTP"></Image>
                                <p>{classItem.fullName}</p>
                                <span>{classItem.createDay}</span>
                            </Col>
                        </Row>
                    ))}
            </Container>
        </div>
    );
}

export default Blog;
