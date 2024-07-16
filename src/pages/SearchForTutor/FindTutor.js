import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MultiRangeSlider from './component/MultiRangeSliderInput';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Search from '~/components/Search';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import request from '~/utils/request';
import { ModalContext } from '~/components/ModalProvider';
import { NoStarIcon, StarIcon } from '~/components/Icons';

import Paging from '~/components/Paging';

import styles from './FindTutor.module.scss';

const cx = classNames.bind(styles);

const GRADE_URL = 'Grade';
const TUTOR_URL = 'Tutors';

function FindTutor() {
    const { searchItem } = useContext(ModalContext);
    const [minValueRate, setMinValueRate] = useState(0);
    const [maxValueRate, setMaxValueRate] = useState(200);
    const [grade, setGrade] = useState('');
    const [gender, setGender] = useState();
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [sort, setSort] = useState({});
    const [tutor, setTutors] = useState([]);
    const [typeOfDegree, setTypeOfDegree] = useState('');
    const [curPage, setcurPage] = useState(1);
    const [pagination, setPagination] = useState({ limit: 0 });
    const [lengthArray, setLength] = useState(0);

    useEffect(() => {
        setcurPage(1);
    }, [minValueRate, maxValueRate]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleInputRate = (e) => {
        console.log(e);
        setMinValueRate(e.minValue);
        setMaxValueRate(e.maxValue);
    };

    const handleSelectSort = (e) => {
        switch (e.target.value) {
            case 'Lowest price':
                setSort({ title: 1, sort: 1 });
                break;
            case 'Highest price':
                setSort({ title: 1, sort: 2 });
                break;
            case 'Rating':
                setSort({ title: 2, sort: 2 });
                break;

            default:
                break;
        }
    };

    const params = {
        Search: searchItem,
        MaxRate: maxValueRate,
        MinRate: minValueRate,
        GradeId: grade,
        Gender: gender,
        TypeOfDegree: typeOfDegree,
        pageIndex: curPage,
        'SortContent.sortTutorBy': sort.title,
        'SortContent.sortTutorType': sort.sort,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleChange();
    };

    const handleChange = async () => {
        try {
            const response = await request.get(`${TUTOR_URL}`, { params });
            setTutors(response.data.listResult);
            setPagination({
                page: 1,
                limit: response.data.limitPage,
                total: 1,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        handleChange();
    }, [maxValueRate, minValueRate, grade, gender, typeOfDegree, sort, curPage, searchItem]);

    useEffect(() => {
        try {
            const Grades = async () => {
                const response = await request.get(GRADE_URL);
                setFetchedGrades(response.data);
            };
            Grades();
        } catch (error) {
            console.log(error);
        }
    }, []);

    //get length
    useEffect(() => {
        const params = {
            Search: searchItem,
            MaxRate: maxValueRate,
            MinRate: minValueRate,
            GradeId: grade,
            Gender: gender,
            TypeOfDegree: typeOfDegree,
            pageIndex: pagination.limit,
            'SortContent.sortTutorBy': sort.title,
            'SortContent.sortTutorType': sort.sort,
        };
        const handleChange = async () => {
            try {
                const response = await request.get(`${TUTOR_URL}`, { params });
                setLength(response.data.listResult.length);
            } catch (error) {
                console.log(error.message);
            }
        };
        handleChange();
    }, [pagination.limit]);

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col lg="3" className={cx('sidebar')}>
                    <form action="GET" className={cx('sidebar__items')}>
                        <p className={cx('sidebar__items-title')}>Filters</p>
                        <div className={cx('sidebar__items-hours')}>
                            <span className={cx('sidebar__items-hours-label')}>
                                Hourly rate:
                                <span>
                                    {minValueRate} - {maxValueRate === 200 ? 'up' : maxValueRate}
                                </span>
                            </span>

                            <MultiRangeSlider
                                min={0}
                                max={200}
                                minValueAge={0}
                                maxValueAge={200}
                                onInput={(e) => {
                                    handleInputRate(e);
                                }}
                            />
                        </div>

                        <div className={cx('sider__items-grade-gender')}>
                            <div className={cx('sidebar__items-grade')}>
                                <label htmlFor="grade">
                                    <strong>Grade:</strong>
                                </label>
                                <select id="grade" onChange={(e) => setGrade(e.target.value)}>
                                    <option value={''}>All</option>
                                    {fetchedGrades.map((grade, index) => {
                                        return (
                                            <option key={index} value={grade.gradeId} style={{ textAlign: 'center' }}>
                                                {grade.number}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className={cx('sidebar__items-gender')}>
                                <label htmlFor="gender">
                                    <strong>Gender</strong>
                                </label>
                                <select
                                    id="gender"
                                    onChange={(e) => {
                                        setcurPage(1);
                                        setGender(e.target.value);
                                    }}
                                >
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx('sidebar__items-role')}>
                            <label htmlFor="levels" className={cx('sidebar__items-role-label')}>
                                Type Of Degree
                            </label>
                            <select
                                id="levels"
                                className={cx('sidebar__items-role-level')}
                                onChange={(e) => {
                                    setcurPage(1);
                                    setTypeOfDegree(e.target.value);
                                }}
                            >
                                <option value={''}>All</option>
                                <option value="College">College</option>
                                <option value="Associate Degree">Associate Degree</option>
                                <option value="Bachelors Degree">Bachelors Degree</option>
                                <option value="Masters Degree">Masters Degree</option>
                                <option value="Doctoral Degree">Doctoral Degree</option>
                            </select>
                        </div>
                    </form>
                </Col>
                <Col lg="9" className={cx('result')}>
                    <div onClick={handleSubmit}>
                        <Search width="840px" />
                    </div>
                    <Row className={cx('result__total')}>
                        <Col className={cx('result__total-number')}>
                            <p>
                                <strong>
                                    {pagination.limit > 0
                                        ? pagination.limit === 1
                                            ? tutor.length
                                            : 5 * (pagination.limit - 1) + lengthArray
                                        : 0}
                                </strong>
                                fit your choices
                            </p>
                        </Col>
                        <Col className={cx('result__total-sort')}>
                            <form action="GET" className={cx('result__total-sort-form')}>
                                <label htmlFor="sort">
                                    <strong>Sort</strong>
                                </label>
                                <select id="sort" onChange={handleSelectSort}>
                                    <option value="Lowest price">Lowest price</option>
                                    <option value="Highest price">Highest price</option>
                                    <option value="Rating">Rating</option>
                                </select>
                            </form>
                        </Col>
                    </Row>
                    <Row className={cx('result__wrapper')}>
                        {tutor &&
                            tutor.map((tutor, index) => {
                                return (
                                    <div key={index} className={cx('result__wrapper-content')}>
                                        <Link to={`/account/tutor/${tutor.fullName}`} state={{ key: tutor.tutorID }}>
                                            <Row className={cx('result__profile')}>
                                                <Col lg="2" className={cx('result__profile-img')}>
                                                    <Image
                                                        src={tutor.avatar || images.avatarDefault}
                                                        alt={tutor.fullName}
                                                    ></Image>
                                                </Col>
                                                <Col lg="6" className={cx('result__profile-header')}>
                                                    <p className={cx('result__profile-header-name')}>
                                                        <strong>{tutor.fullName}</strong>
                                                    </p>
                                                    <p className={cx('result__profile-header-title')}>
                                                        {tutor.headline}
                                                    </p>
                                                    <p className={cx('result__profile-header-bio')}>
                                                        {tutor.description}
                                                    </p>
                                                </Col>
                                                <Col lg="4" className={cx('result__profile-generality')}>
                                                    <div className={cx('result__profile-generality-valuate')}>
                                                        <div className={cx('result__profile-generality-valuate-ic')}>
                                                            {Array.from(
                                                                { length: Math.round(tutor.start) },
                                                                (_, index) => (
                                                                    <StarIcon
                                                                        key={index}
                                                                        className={cx(
                                                                            'result__profile-generality-valuate-ic-star',
                                                                        )}
                                                                    ></StarIcon>
                                                                ),
                                                            )}
                                                            {Array.from(
                                                                { length: 5 - Math.round(tutor.start) },
                                                                (_, index) => (
                                                                    <NoStarIcon
                                                                        key={`empty-${index}`}
                                                                        className={cx(
                                                                            'result__profile-generality-valuate-ic-star',
                                                                        )}
                                                                    ></NoStarIcon>
                                                                ),
                                                            )}
                                                        </div>
                                                        <span
                                                            className={cx('result__profile-generality-valuate-number')}
                                                        ></span>
                                                        <span
                                                            className={cx('result__profile-generality-valuate-total')}
                                                        ></span>
                                                    </div>
                                                    <div className={cx('result__profile-generality-price')}>
                                                        <i className={cx('wc-clock-o', 'wc-green', 'text-center')}></i>
                                                        <span>{tutor.hourlyRate}/hour</span>
                                                    </div>
                                                    <div className={cx('result__profile-generality-hour')}>
                                                        <span>{tutor.hourlyRate}</span>
                                                    </div>
                                                    <div className={cx('result__profile-generality-respond')}>
                                                        <span>
                                                            Response Time: <strong>{5} minutes</strong>
                                                        </span>
                                                    </div>
                                                    <Button orange className={cx('result__profile-generality-btn')}>
                                                        View {tutor.fullName} profile
                                                    </Button>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg="12">
                                                    <p className={cx('result__profile-dsc')}>{tutor.description}</p>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                );
                            })}

                        {pagination.limit > 1 && (
                            <Paging pagination={pagination} curPage={curPage} setcurPage={setcurPage} />
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default FindTutor;
