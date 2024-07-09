import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useDebounce from '~/hooks/useDebounce';
import Paging from '~/components/Paging';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Blog.module.scss';
import Post from '~/components/Post';

const cx = classNames.bind(styles);

const FORM_FIND_TUTOR_URL = 'FormFindTutor/tutor/searchpost';
const APPLY_POST_URL = 'FormFindTutor/tutor/applypost';

function Blog() {
    const requestPrivate = useRequestsPrivate();
    const [listClasses, setListClasses] = useState([]);
    const [disable, setDisable] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [limitPageIndex, setLimitPageIndex] = useState(1);
    const [gender, setGender] = useState();
    const [sort, setSort] = useState();
    const [subject, setSubject] = useState('');
    const [hourlyRate, setHourlyRate] = useState();
    const [gradeId, setGradeId] = useState('');
    const [typeOfDegree, setTypeOfDegree] = useState('');

    const debouncedValueSubject = useDebounce(subject, 500);
    const debouncedValueHourlyRate = useDebounce(hourlyRate, 500);
    const debouncedGradeId = useDebounce(gradeId, 500);
    const debouncedTypeOfDegree = useDebounce(typeOfDegree, 500);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFormClass = async () => {
            const response = await requestPrivate.get(
                FORM_FIND_TUTOR_URL,
                {
                    Search: debouncedValueSubject,
                    HourlyRate: debouncedValueHourlyRate,
                    GradeId: debouncedGradeId,
                    Gender: gender,
                    TypeOfDegree: debouncedTypeOfDegree,
                    pageIndex,
                    SortContent: {
                        sortTutorBy: sort?.title,
                        sortTutorType: sort?.sort,
                    },
                },
                {
                    signal: controller.signal,
                },
            );
            isMounted && setListClasses(response.data.listResult) && setLimitPageIndex(response.data.limitPage);

            return () => {
                isMounted = false;
                controller.abort();
            };
        };

        getFormClass();
    }, [debouncedValueSubject, debouncedValueHourlyRate, debouncedGradeId, gender, debouncedTypeOfDegree, sort]);

    const handleApply = async (id) => {
        const response = await requestPrivate.post(APPLY_POST_URL, id);
        if (response.status === 200) {
            setDisable((prev) => [...prev, id]);
        }
    };

    const handleSelectSort = (e) => {
        switch (e.target.value) {
            case 'Soonest':
                setSort({ title: 2, sort: 1 });
                break;
            case 'Latest':
                setSort({ title: 2, sort: 2 });
                break;
            default:
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col lg="3" className={cx('search')}>
                        <div className={cx('slip')}>
                            <h3>Search</h3>
                            <div className={cx('search__items')}>
                                <label htmlFor="textSubject">Subject</label>
                                <input
                                    type="text"
                                    id="textSubject"
                                    onChange={(e) => {
                                        setSubject(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('search__items')}>
                                <label htmlFor="hourlyRate">Hourly Rate</label>
                                <input
                                    type="number"
                                    id="HourlyRate"
                                    onChange={(e) => {
                                        setHourlyRate(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('search__items')}>
                                <label htmlFor="gradeId">Grade Id</label>
                                <input
                                    type="text"
                                    id="GradeId"
                                    onChange={(e) => {
                                        setGradeId(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className={cx('search__items')}>
                                <label htmlFor="gender">
                                    <strong>Gender:</strong>
                                </label>
                                <select id="gender" onChange={(e) => setGender(e.target.value)}>
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </select>
                            </div>
                            <div className={cx('search__items')} onChange={(e) => setTypeOfDegree(e.target.value)}>
                                <label htmlFor="typeOfDegree">Type Of Degree</label>
                                <input type="text" id="typeOfDegree"></input>
                            </div>
                        </div>
                    </Col>
                    <Col lg="9">
                        <Row className={cx('result__total')}>
                            <Col className={cx('result__total-number')}>
                                <p>
                                    <strong>3,335 pirates 1 tutors </strong>fit your choices
                                </p>
                            </Col>
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
                        </Row>
                        <Post
                            handleApply={handleApply}
                            listClasses={listClasses}
                            disable={disable}
                            syntax={'applyPost'}
                        ></Post>
                        <Paging pagination={limitPageIndex} curPage={pageIndex} setcurPage={setPageIndex} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Blog;
