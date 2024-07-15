import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Paging from '../Paging';
import { ModalContext } from '../ModalProvider';

import styles from './Post.module.scss';

const cx = classNames.bind(styles);

function Post({
    listClasses,
    listTutor,
    idForm,
    handleApply,
    handleViewList,
    handleBrowseTutor,
    handleDeleteForm,
    handleUpdateForm,
    handleSelectSort,
    handleGenerateClass,
    handleForm,
    disable,
    isApprove,
    syntax,
    pagination,
    curPage,
    setcurPage,
}) {
    const { setFormId } = useContext(ModalContext);
    console.log(curPage);
    return (
        <Container>
            <Row className={cx('result__total')}>
                <Col className={cx('result__total-number')}>
                    <p>
                        <strong>{listClasses?.length} form </strong>fit your choices
                    </p>
                </Col>
                {syntax === 'applyPost' ? (
                    <Col className={cx('result__total-sort')}>
                        <form action="GET" className={cx('result__total-sort-form')}>
                            <label htmlFor="sort">
                                <strong>Sort</strong>
                            </label>
                            <select id="sort" onChange={handleSelectSort}>
                                <option value="Soonest">Soonest</option>
                                <option value="Latest">Latest</option>
                            </select>
                        </form>
                    </Col>
                ) : syntax === 'applyForm' ? (
                    <Col className={cx('result__total-sort')}>
                        <form action="GET" className={cx('result__total-sort-form')}>
                            <label htmlFor="sort">
                                <strong>Sort</strong>
                            </label>
                            <select id="sort" onChange={(e) => handleForm(e.target.value)}>
                                <option value="Approve">Approve</option>
                                <option value="Not Approve">Not Approve</option>
                            </select>
                        </form>
                    </Col>
                ) : (
                    <Col className={cx('result__total-sort')}>
                        <form action="GET" className={cx('result__total-sort-form')}>
                            <label htmlFor="sort">
                                <strong>Sort</strong>
                            </label>
                            <select id="sort" onChange={(e) => handleForm(e.target.value)}>
                                <option value="Not yet approved">Not yet approved</option>
                                <option value="Has been approved">Has been approved</option>
                                <option value="Not approved">Not approved</option>
                                <option value="Approved tutor">Approved tutor</option>
                            </select>
                        </form>
                    </Col>
                )}
            </Row>
            {listClasses?.length > 0 &&
                listClasses.map((classItem, index) => (
                    <Row key={index} className={cx('container__hero')}>
                        <Col lg="8" className={cx('container__card')}>
                            <div className={cx('container__form-control')}>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div>
                                        <strong>Tittle: </strong>
                                        <span> {classItem?.title}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Subject: </strong>
                                        <span> {classItem?.subjectName}</span>
                                    </div>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Type of degree: </strong>
                                        <span> {classItem?.typeOfDegree}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Day start: </strong>
                                        <span> {classItem?.dayStart}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>Day end: </strong>
                                        <span> {classItem?.dayEnd}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Min price: </strong>
                                        <span> {classItem?.minHourlyRate}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>Max price: </strong>
                                        <span> {classItem?.maxHourlyRate}</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Start: </strong>
                                        <span> {classItem?.timeStart} hour</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>End: </strong>
                                        <span> {classItem?.timeEnd} hour</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Day of week: </strong>
                                        <span> {classItem?.dayOfWeek}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>Tutor Gender: </strong>
                                        <span> {classItem?.tutorGender === true ? 'Male' : 'Female'}</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div>
                                        <strong>Description: </strong>
                                        <span>{classItem?.description}</span>
                                    </div>
                                </div>
                                {syntax === 'applyPost' ? (
                                    disable.length > 0 && disable.find((id) => id === classItem.formId) ? (
                                        <></>
                                    ) : (
                                        <Button
                                            className={cx('container__form-control-submit')}
                                            onClick={() => {
                                                handleApply(classItem?.formId);
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    )
                                ) : syntax === 'applyForm' ? (
                                    <></>
                                ) : (
                                    <div className={cx('container__form-control-btn')}>
                                        {classItem?.status && classItem?.isActived ? (
                                            <Button
                                                className={cx('container__form-control-submit')}
                                                onClick={() => {
                                                    handleViewList(classItem?.formId);
                                                }}
                                            >
                                                View My Tutor
                                            </Button>
                                        ) : classItem?.status && classItem?.isActived === null ? (
                                            <Button
                                                className={cx('container__form-control-submit')}
                                                onClick={() => {
                                                    handleViewList(classItem?.formId);
                                                }}
                                            >
                                                View All Tutor
                                            </Button>
                                        ) : !classItem?.status && classItem?.isActived === null ? (
                                            <Button
                                                className={cx('container__form-control-submit')}
                                                onClick={() => {
                                                    handleViewList(classItem?.formId);
                                                }}
                                            >
                                                Reason
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    className={cx('container__form-control-delete')}
                                                    onClick={() => {
                                                        handleDeleteForm(classItem?.formId);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    className={cx('container__form-control-update')}
                                                    onClick={() => {
                                                        handleUpdateForm(classItem);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    className={cx('container__form-control-submit')}
                                                    onClick={() => {
                                                        handleViewList(classItem?.formId);
                                                    }}
                                                >
                                                    View All Tutor
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Col>
                        {syntax === 'applyPost' ? (
                            <Col lg="4" className={cx('container_student')}>
                                <Image src={images.avatar} alt="NTP"></Image>
                                <p>{classItem.fullName}</p>
                                <span>{classItem.createDay}</span>
                            </Col>
                        ) : syntax === 'applyForm' && isApprove === false ? (
                            <Col key={index} lg="4">
                                <Button
                                    to={'/generateClass'}
                                    onClick={() => {
                                        setFormId(classItem?.formId);
                                    }}
                                    orange
                                    className={cx('container_createClass')}
                                >
                                    Create class
                                </Button>
                            </Col>
                        ) : syntax === 'Approved tutor' ? (
                            <Col key={index} lg="4">
                                {listTutor?.length > 0 &&
                                    idForm === classItem?.formId &&
                                    listTutor.map((tutor, index) => (
                                        <div key={index} className={cx('container_tutor-rehearsal')}>
                                            <Button
                                                to={`/account/tutor/${tutor.tutorId}`}
                                                state={{ key: tutor.tutorId }}
                                                className={cx('container_tutor')}
                                            >
                                                <Image src={images.avatar} alt="NTP"></Image>
                                                <div className={cx('container_tutor-dsc')}>
                                                    <span>
                                                        <p>{tutor.tutorName}</p>
                                                        <span>{tutor.dayApply}</span>
                                                    </span>
                                                </div>
                                            </Button>
                                        </div>
                                    ))}
                            </Col>
                        ) : (
                            <Col key={index} lg="4">
                                {listTutor?.length > 0 &&
                                    idForm === classItem?.formId &&
                                    listTutor.map((tutor, index) => (
                                        <div key={index} className={cx('container_tutor-rehearsal')}>
                                            <Button
                                                to={`/account/tutor/${tutor.tutorId}`}
                                                state={{ key: tutor.tutorId }}
                                                className={cx('container_tutor')}
                                            >
                                                <Image src={images.avatar} alt="NTP"></Image>
                                                <div className={cx('container_tutor-dsc')}>
                                                    <span>
                                                        <p>{tutor.tutorName}</p>
                                                        <span>{tutor.dayApply}</span>
                                                    </span>
                                                </div>
                                            </Button>
                                            <div
                                                className={cx('container_tutor-approve')}
                                                onClick={() => {
                                                    <p>{tutor.tutorName}</p>;
                                                    handleBrowseTutor(idForm, tutor.userIdTutor);
                                                }}
                                            >
                                                Approve
                                            </div>
                                        </div>
                                    ))}
                            </Col>
                        )}
                    </Row>
                ))}
            {pagination.limit > 1 && <Paging pagination={pagination} curPage={curPage} setcurPage={setcurPage} />}
        </Container>
    );
}

export default Post;
