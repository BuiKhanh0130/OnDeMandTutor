import classNames from "classnames/bind";
import {  useMemo } from "react";
import styles from './LearnMore.module.scss'
import  Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import images from "~/assets/images";
// import Figure from 'react-bootstrap/Figure'

const cx = classNames.bind(styles);

function LearnMore(){
    const lessions = useMemo(
        () =>[
            {
                title: 'What to Expect at Your First Japanese Lesson',
                content: 'Content 1',
                image: 'https://blog.wyzant.com/wp-content/uploads/2022/07/My-Post.jpg'
            },

            {
                title: 'Why Do I Need Statistics?',
                content: 'Content 2',
                image: 'https://blog.wyzant.com/wp-content/uploads/2023/08/Why-Do-I-need-Statistics.png'
            },

            {
                title: 'How to Type French Accent Marks: 42 Keyboard Shortcuts',
                content: 'Content 3',
                image: 'https://blog.wyzant.com/wp-content/uploads/2020/04/How-to-Type-French-Accent-Marks-42-Keyboard-Shortcuts.png'
            },

            {
                title: 'The Electoral College Explained in Under 5 Minutes',
                content: 'Content 4',
                image: 'https://blog.wyzant.com/wp-content/uploads/2020/09/The-Electoral-College-Explained-in-Under-5-mins.png'
            },

            {
                title: 'How to Type Katakana in device',
                content: 'Content 4',
                image: 'https://blog.wyzant.com/wp-content/uploads/2024/02/a-kid-using-ipad-lying-on-the-green-grass-backyard-2023-11-27-05-30-49-utc-scaled.jpg'
            },

        ]
        , [])

        const sliders = useMemo(
           () => [
                    {
                    id: 1,
                    title: "accusamus beatae ad facilis cum similique qui sunt",
                    url: "https://via.placeholder.com/600/92c952",
                    },
                    {
                    id: 2,
                    title: "reprehenderit est deserunt velit ipsam",
                    url: "https://via.placeholder.com/600/771796",
                    },
                    {
                    id: 3,
                    title: "officia porro iure quia iusto qui ipsa ut modi",
                    url: "https://via.placeholder.com/600/24f355",
                    },
                    {
                    id: 4,
                    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
                    url: "https://via.placeholder.com/600/d32776",
                    },
                    {
                    id: 5,
                    title: "natus nisi omnis corporis facere molestiae rerum in",
                    url: "https://via.placeholder.com/600/f66b97",
                    }
                ], [] )

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: "linear"
            
            };

    return (
        <div className={cx('wrapper')}>
            <Container className="container">
                <Row>
                     <div className={cx('image_header')}>
                        <h1>Become a expert</h1>
                        <h3>Resources created by the largest network of private tutors on the web. </h3>
                        </div> 
                </Row>
                <Row>
                    <Col lg='9' className={cx('container__lession')}>
                        <div className={cx('container__lession-title')}>
                                <h1>Why 8 Hours of Private Tutoring Means a Letter Grade of Improvement</h1>
                                <img src='https://blog.wyzant.com/wp-content/uploads/2020/05/Why-8-Hours-Of-Tutoring-Means-a-Grade-Level-of-Improvement.png' alt='les'></img>

                                <h5>Finding 1: Eight weeks of tutoring reduces math anxiety by up to 20%</h5>
                                <p>
                                Math anxiety is a real and serious psychological condition that can inhibit a student’s ability to perform even the simplest arithmetic calculations.

        In fact, a math test can activate the pain matrix in your brain, which is the same region that lights up when you get injured. In more serious cases, even just the numbers on a receipt can send people into a panic.
                                </p>

                                <h5>The good news is that private tutoring can significantly alleviate this math anxiety.</h5>
                                <p>
                                This kind of highly customized learning plan is exactly what you can get through online tutoring sessions. 
                                So if your kid struggles with math anxiety, you should consider working with affordable tutors to give them one-on-one lessons and minimize the anxiety.
                                </p>
                                <h5>
                                Finding 2: When kids ask questions, they want answers (not attention)
                                </h5>
                                <p>
                                Remember being afraid to raise your hand in front of the class for fear of feeling dumb? It wasn’t feeling dumb you were afraid of; it was the shame that came with it.

        What if you asked a silly question? What if everyone else understood it but you? Those questions might often hold you back from getting clarification on a difficult concept.

        Unfortunately, no matter how intelligent or engaged a student is (or wants to be), social surroundings play a role. No one wants to feel like they know less than their peers and that embarrassment is especially prominent in kids.
                                </p>

                                <h5>The Spotlight Effect</h5>
                                <p>
                                When kids ask questions, they don’t want to feel the rest of the classroom’s attention directed towards them even though that’s not actually the case. This is known as the spotlight effect in psychology and refers to the tendency to overestimate how much people notice or judge your appearance and/or behavior.

        Although the spotlight effect is common across people of all age groups, it’s more prominent in adolescents and young adults. This is likely because at this age, humans typically have a heightened concern for their social standing.
                                </p>

                                <h5>Finding 3: Giving students choices increases their willingness to take on difficult tasks</h5>
                                <p>
                                A 2008 research at Duke University looked at 41 separate studies and found when children had a choice in what they worked on, they were more likely to take on tasks that were challenging. In addition, a child given the chance to learn something they enjoy has shown to result in a higher level of persistence and a greater dedication to completing the work at hand.

        Students need variety – whether it’s in terms of where they study, the learning channel they use, the subjects being covered, or the amount of exercises they work on. Studies that go as far back as 1978 have shown that retention improves with flexible circumstances. Besides, learning new things can help children’s brains to change.
                                </p>

                                <h5>Finding 4: Students with involved parents are more likely to earn higher test scores and enroll in higher-level programs</h5>
                                <p>
                                As a parent, you’ve probably seen it. The more (or less) time you’ve spent helping your child or actively discussing school has had an effect. In fact, research shows that when parents are engaged, their kids are more likely to earn higher grades and even enroll in higher level programs.

        Not only that, they develop more self-confidence in the classroom and feel more motivated to learn. As a result, they are less likely to struggle with low self-esteem or need redirection in the classroom.
                                </p>
                        </div>
                    </Col>
                    {
                    <Col lg='3' className={cx('container__content')}>
                            <h3 className="text__header">
                                <span className="inner-arrow">Population Post</span>
                            </h3>
                        {lessions.map((lession, index)=>{
                            return (
                                    <div  key ={index} className={cx('container__items')}>
                                        <div className={cx('container__content-pic')}>
                                            <img src={lession.image} alt='noImage'></img>
                                        </div>
                                        <div>
                                            <div className={cx('container__content-title')}>
                                                <h4>{lession.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })}
                        </Col>
                    }
                </Row>

                {/* <Row >
                       <Col lg='9' className="container__content">
                                <div className="container__header">
                                        <h4 className="inner_text">Related Articles</h4>
                                </div>
                        <Slider {...settings}>
                        {
                                    sliders.map((slider, index) =>{
                                        return (
                                            <div key={slider.id} className={cx('container__slider__block')}>
                                                    <div className={cx('container__slider-pic')}>
                                                        <img src={slider.url} alt='noImage'></img>
                                                    </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                       </Col> 
                </Row> */}
            </Container>
        </div>
    )
}

export default LearnMore;