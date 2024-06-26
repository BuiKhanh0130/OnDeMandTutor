import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MultiRangeSlider from './component/MultiRangeSliderInput';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Search from '~/components/Search';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import { StarIcon } from '~/components/Icons';
import useRequestsPrivate from '~/hook/useRequestPrivate';
import request from '~/utils/request';

import styles from './FindTutor.module.scss';

const cx = classNames.bind(styles);

const GRADE_URL = 'Grade';
const TUTOR_URL = 'Tutors';

function FindTutor() {
    const [searchValue, setSearchValue] = useState('');
    const [minValueRate, setMinValueRate] = useState(10);
    const [maxValueRate, setMaxValueRate] = useState(200);
    const [grade, setGrade] = useState('G0012');
    const [gender, setGender] = useState(true);
    const [fetchedGrades, setFetchedGrades] = useState([]);
    const [sort, setSort] = useState();
    const [tutor, setTutors] = useState();
    const requestPrivate = useRequestsPrivate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleInputRate = (e) => {
        setMinValueRate(e.minValue);
        setMaxValueRate(e.maxValue);
    };

    const handleSearchChange = (newValue) => {
        setSearchValue(newValue);
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
    console.log(sort);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const params = {
                Search: searchValue,
                MaxRate: maxValueRate,
                MinRate: minValueRate,
                GradeId: grade,
                Gender: gender,
                TypeOfDegree: '',
                SortContent: {
                    sortTutorBy: sort.title,
                    sortTutorType: sort.sort,
                },
            };

            const response = await request.get(`${TUTOR_URL}`, { params });

            console.log(response.data);
            setTutors(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const dayOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], []);

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
                                min={10}
                                max={200}
                                step={5}
                                minValue={minValueRate}
                                maxValue={maxValueRate}
                                onInput={(e) => {
                                    handleInputRate(e);
                                }}
                            />
                        </div>

                        <div className={cx('sider__items-grade-gender')}>
                            <div className={cx('sidebar__items-grade')}>
                                <label htmlFor="grade" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                                    <strong>Grade:</strong>
                                </label>
                                <select id="grade" onChange={(e) => setGrade(e.target.value)}>
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
                                <label htmlFor="gender" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                                    <strong>Gender:</strong>
                                </label>
                                <select id="gender" onChange={(e) => setGender(e.target.value)}>
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx('sidebar__items-role')}>
                            <label htmlFor="levels" className={cx('sidebar__items-role-label')}>
                                Type Of Degree
                            </label>
                            <select id="levels" className={cx('sidebar__items-role-level')}>
                                <option value="College">College</option>
                                <option value="Associate Degree">Associate Degree</option>
                                <option value="Bachelors Degree">Bachelors Degree</option>
                                <option value="Masters Degree">Masters Degree</option>
                                <option value="Doctoral Degree">Doctoral Degree</option>
                            </select>
                        </div>

                        <div className={cx('sidebar__items-availability')}>
                            <p className={cx('sidebar__items-availability-title')}>Availability</p>
                            {dayOfWeek.map((day, index) => {
                                return (
                                    <div key={index} className={cx('sidebar__items-availability-list')}>
                                        <label htmlFor={day}>{day}</label>
                                        <input
                                            type="checkbox"
                                            id={day}
                                            value={day}
                                            className="sidebar__items-availability-list-day"
                                        ></input>
                                    </div>
                                );
                            })}
                        </div>
                    </form>
                </Col>
                <Col lg="9" className={cx('result')}>
                    <div onClick={handleSubmit}>
                        <Search width="770px" onChangeResult={handleSearchChange} />
                    </div>
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
                                    <option value="best">Best match</option>
                                    <option value="Lowest price">Lowest price</option>
                                    <option value="Highest price">Highest price</option>
                                    <option value="Rating">Rating</option>
                                    <option value="experience">Experience</option>
                                </select>
                            </form>
                        </Col>
                    </Row>
                    <Row className={cx('result__wrapper')}>
                        {tutor &&
                            tutor.map((tutor, index) => {
                                return (
                                    <div key={index} className={cx('result__wrapper-content')}>
                                        <Link to={`account/${tutor.role}/${tutor.fullName}`}>
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
                                                    {/* {tutor.ratings.map((rate, index) => {
                                                    return ( */}
                                                    <div
                                                        // key={index}
                                                        className={cx('result__profile-generality-valuate')}
                                                    >
                                                        <div className={cx('result__profile-generality-valuate-ic')}>
                                                            <StarIcon></StarIcon>
                                                            <StarIcon></StarIcon>
                                                            <StarIcon></StarIcon>
                                                            <StarIcon></StarIcon>
                                                            <StarIcon></StarIcon>
                                                        </div>
                                                        <span
                                                            className={cx('result__profile-generality-valuate-number')}
                                                        >
                                                            {/* {rate.start} */}
                                                        </span>
                                                        <span
                                                            className={cx('result__profile-generality-valuate-total')}
                                                        >
                                                            {/* ({rate.ratings}) */}
                                                        </span>
                                                    </div>
                                                    {/* ); */}
                                                    {/* })} */}
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
                                                    <Button
                                                        orange
                                                        // to={`account/${tutor.role}/${tutor.name}`}
                                                        className={cx('result__profile-generality-btn')}
                                                    >
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default FindTutor;
