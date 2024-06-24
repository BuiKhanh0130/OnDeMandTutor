import {useMemo} from 'react'
import classNames from 'classnames/bind';
import styles from './TipSuccess.module.scss'
import  Container from 'react-bootstrap/Container';
import  Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import images from '~/assets/images';

const cx = classNames.bind(styles);
function TipSuccess(){
        const Tips = useMemo(
            () =>[
                {
                    image: 'hsdvb',
                    title: 'Make a great first impression.',
                    content: 'The best profiles include:',
                    items: ['A great photo', 'Clear descriptions of your expertise', 'Details about your background', 'A little about your personality'],
                    button: 'Update Profile'
                },

                {
                    image: '',
                    title: 'Make a great first impression.',
                    content: 'The best profiles include:',
                    items: ['A great photo', 'Clear descriptions of your expertise', 'Details about your background', 'A little about your personality'],
                    button: 'Update Profile'
                },

                {
                    image: '',
                    title: 'Make a great first impression.',
                    content: 'The best profiles include:',
                    items: ['A great photo', 'Clear descriptions of your expertise', 'Details about your background', 'A little about your personality'],
                },

                {
                    image: '',
                    title: 'Make a great first impression.',
                    content: 'The best profiles include:',
                    items: ['A great photo', 'Clear descriptions of your expertise', 'Details about your background', 'A little about your personality'],
                },

                {
                    image: '',
                    title: 'Make a great first impression.',
                    content: 'The best profiles include:',
                    items: ['A great photo', 'Clear descriptions of your expertise', 'Details about your background', 'A little about your personality'],
                }
            ], [])


    return(
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col className={cx('tipSuccess__image')}>
                            <h1>Get Your First Students Now</h1>
                            <h2>Complete 5 quick tips to bring in your first students.</h2>
                    </Col>
                </Row>
            
                <Row className={cx('tipSuccess1')}>
                    <Col lg='6' className={cx('tipSuccess__guide')}>
                        <h2>Make a great first impression.</h2>
                        <p>Your profile is how students find and get to know you. Add all your subject qualifications to appear in more search results.</p>
                        <h4>The best profiles include:</h4>
                        <ul>
                            <li >A great photo</li>
                            <li >Clear descriptions of your expertise</li>
                            <li >Details about your background</li>
                            <li >A little about your personality</li>
                        </ul>
                        <div className={cx('tipSuccess__button')}>
                        <button >Update Profile</button>
                        </div>
                    </Col>
                    <Col lg='6' className={cx('tipSuccess__images1')}>
                            <img src={images.tipSuccess1} alt='TipSuccess1'></img>
                    </Col>
                </Row>

                <Row className={cx('tipSuccess2')}>
                    <Col lg='6' className={cx('tipSuccess__images2')}>
                            <img src={images.tipSuccess2} alt='TipSuccess1'></img>
                    </Col>

                    <Col lg='6' className={cx('tipSuccess__guide')}>
                        <h2>Be flexible to get your first students faster.</h2>
                        <p>Students usually want help right away. You can attract your first students by being available for more types of lessons and initially reducing your rate.</p>
                        {/* <h4>The best profiles include:</h4> */}
                        <ul>
                            <li >Be available for urgent lessons.</li>
                            <li >Expand your travel radius or get approved to tutor online.</li>
                            <li >Consider lowering your rates to attract your first students.</li>
                        </ul>
                        <div className={cx('tipSuccess__button')}>
                        <button >Create Ads</button>
                        </div>
                    </Col>
                </Row>

                <Row className={cx('tipSuccess1')}>
                    <Col lg='6' className={cx('tipSuccess__guide')}>
                        <h2>Search for student posts and contact them.</h2>
                        <p>Students will have a better experience when tutors can contact them quickly and easily.</p>
                        <h4>The best advices:</h4>
                        <ul>
                            <li >Show enthusiasm</li>
                            <li >Respond quickly to customers</li>
                            <li >Search for student posts by criteria such as subject, level, and study time.</li>
                        </ul>
                        <div className={cx('tipSuccess__button')}>
                        <button >Update Profile</button>
                        </div>
                    </Col>
                    <Col lg='6' className={cx('tipSuccess__images3')}>
                            <img src={images.tipSuccess3} alt='TipSuccess1'></img>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default TipSuccess;