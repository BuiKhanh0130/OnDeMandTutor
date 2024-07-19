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

const FORM_FIND_TUTOR_URL = 'formfindtutor/search_post';
const APPLY_POST_URL = 'formfindtutor/tutor_applypost';

function Blog() {
    const requestPrivate = useRequestsPrivate();
    const [listClasses, setListClasses] = useState([]);
    const [disable, setDisable] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 0,
        total: 1,
    });
    const [gender, setGender] = useState();
    const [subject, setSubject] = useState('');
    const [hourlyRate, setHourlyRate] = useState();
    const [gradeId, setGradeId] = useState('');
    const [typeOfDegree, setTypeOfDegree] = useState('');
    const [sortPostBy, setSortPostBy] = useState(0);
    const [sortPostType, setSortPostType] = useState(1);
    const [curPage, setcurPage] = useState(1);
    const debouncedValueSubject = useDebounce(subject, 500);
    const debouncedValueHourlyRate = useDebounce(hourlyRate, 500);
    const debouncedGradeId = useDebounce(gradeId, 500);
    const debouncedTypeOfDegree = useDebounce(typeOfDegree, 500);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        let url = FORM_FIND_TUTOR_URL;
        if (
            debouncedValueSubject ||
            debouncedValueHourlyRate ||
            debouncedGradeId ||
            debouncedTypeOfDegree ||
            curPage ||
            sortPostBy
        ) {
            const params = new URLSearchParams();
            if (debouncedValueSubject) {
                params.append('Search', debouncedValueSubject);
            }
            if (debouncedValueHourlyRate) {
                params.append('HourlyRate', debouncedValueHourlyRate);
            }
            if (debouncedGradeId) {
                params.append('GradeId', debouncedGradeId);
            }
            if (gender) {
                params.append('Gender', gender);
            }
            if (debouncedTypeOfDegree) {
                params.append('TypeOfDegree', debouncedTypeOfDegree);
            }
            if (sortPostBy) {
                params.append('SortContent.sortPostBy', sortPostBy);
            }
            if (sortPostType) {
                params.append('SortContent.sortPostType', sortPostType);
            }
            if (curPage) {
                params.append('pageIndex', curPage);
            }
            url += `?${params.toString()}`;
            console.log(url);
        }
        const getFormClass = async () => {
            const response = await requestPrivate.get(url, {
                signal: controller.signal,
            });
            isMounted && setListClasses(response.data.listResult);
            setPagination((prev) => ({ ...prev, limit: response.data.limitPage }));
            return () => {
                isMounted = false;
                controller.abort();
            };
        };

        getFormClass();
    }, [
        debouncedValueSubject,
        debouncedValueHourlyRate,
        debouncedGradeId,
        gender,
        debouncedTypeOfDegree,
        sortPostType,
        curPage,
        sortPostBy,
        requestPrivate,
    ]);

    const handleApply = async (id) => {
        const response = await requestPrivate.post(APPLY_POST_URL, id);
        if (response.status === 200) {
            setDisable((prev) => [...prev, id]);
        }
    };

    const handleSelectSort = (e) => {
        switch (e.target.value) {
            case 'Soonest':
                setSortPostType(1);
                break;
            case 'Latest':
                setSortPostType(2);
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
                        <Post
                            handleApply={handleApply}
                            listClasses={listClasses}
                            handleSelectSort={handleSelectSort}
                            disable={disable}
                            syntax={'applyPost'}
                        ></Post>
                        {pagination.limit > 1 && (
                            <Paging pagination={pagination} curPage={curPage} setcurPage={setcurPage} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Blog;
