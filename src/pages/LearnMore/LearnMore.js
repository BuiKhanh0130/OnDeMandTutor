import classNames from "classnames/bind";
import {useState, useMemo } from "react";
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
                topic: 'Why 8 Hours of Private Tutoring Means a Letter Grade of Improvement',
                image: 'https://blog.wyzant.com/wp-content/uploads/2020/05/Why-8-Hours-Of-Tutoring-Means-a-Grade-Level-of-Improvement.png',
                titles: ["Finding 1: Eight weeks of tutoring reduces math anxiety by up to 20%",
                    "The good news is that private tutoring can significantly alleviate this math anxiety.",
                    "Finding 2: When kids ask questions, they want answers (not attention)",
                    "The Spotlight Effect",
                    "Finding 3: Giving students choices increases their willingness to take on difficult tasks",
                    "Finding 4: Students with involved parents are more likely to earn higher test scores and enroll in higher-level programs"
                ],
                contents: [
                    "Math anxiety is a real and serious psychological condition that can inhibit a student’s ability to perform even the simplest arithmetic calculations.In fact, a math test can activate the pain matrix in your brain, which is the same region that lights up when you get injured. In more serious cases, even just the numbers on a receipt can send people into a panic.",
                    " This kind of highly customized learning plan is exactly what you can get through online tutoring sessions. So if your kid struggles with math anxiety, you should consider working with affordable tutors to give them one-on-one lessons and minimize the anxiety.",
                    "Remember being afraid to raise your hand in front of the class for fear of feeling dumb? It wasn’t feeling dumb you were afraid of; it was the shame that came with it. What if you asked a silly question? What if everyone else understood it but you? Those questions might often hold you back from getting clarification on a difficult concept. Unfortunately, no matter how intelligent or engaged a student is (or wants to be), social surroundings play a role. No one wants to feel like they know less than their peers and that embarrassment is especially prominent in kids.",
                    "When kids ask questions, they don’t want to feel the rest of the classroom’s attention directed towards them even though that’s not actually the case. This is known as the spotlight effect in psychology and refers to the tendency to overestimate how much people notice or judge your appearance and/or behavior. Although the spotlight effect is common across people of all age groups, it’s more prominent in adolescents and young adults. This is likely because at this age, humans typically have a heightened concern for their social standing.",
                    " A 2008 research at Duke University looked at 41 separate studies and found when children had a choice in what they worked on, they were more likely to take on tasks that were challenging. In addition, a child given the chance to learn something they enjoy has shown to result in a higher level of persistence and a greater dedication to completing the work at hand. Students need variety – whether it’s in terms of where they study, the learning channel they use, the subjects being covered, or the amount of exercises they work on. Studies that go as far back as 1978 have shown that retention improves with flexible circumstances. Besides, learning new things can help children’s brains to change.",
                    "As a parent, you’ve probably seen it. The more (or less) time you’ve spent helping your child or actively discussing school has had an effect. In fact, research shows that when parents are engaged, their kids are more likely to earn higher grades and even enroll in higher level programs. Not only that, they develop more self-confidence in the classroom and feel more motivated to learn. As a result, they are less likely to struggle with low self-esteem or need redirection in the classroom."
                ]

            },
            {
                topic: 'What to Expect at Your First Japanese Lesson',
                image: 'https://blog.wyzant.com/wp-content/uploads/2022/07/My-Post.jpg',
                titles: [ "The benefits of Japanese lessons", 
                    "The perfect Japanese tutor for you",
                    "Tutoring experience",
                    "Budget",
                    "Expertise and background",
                    "Contacting a Japanese tutor",
                    "Do I take language lessons online or in-person?",
                    "Help your language tutor help you"


                ],
                contents: ["First, a question: if there are seemingly infinite learning resources available online, then why are lessons with a tutor the way to go?\nPut simply, a tutor has the knowledge to guide you in the right direction to determine your starting point. They can help you choose the resources that will be most valuable to you at your current skill level.\nIt is also important to consider that a textbook or website cannot give you feedback on your ability to speak and understand Japanese. A tutor can do this as well as give you live feedback on your Japanese pronuncation.\nWhether your goal is to get the basics down before moving on to Japanese self learning or if you are seeking a one-on-one experience with someone who can provide in-depth explanations of Japanese grammar basics, Japanese tutoring is an important first step. ", 
                    "Every tutor is different, just as every student is unique. It is important to look at a tutor’s biography to understand what their specialty is so that you can determine what type of learning experience is right for you.",
                    "If you are looking to take lessons online, then choosing a tutor who has experience teaching online is your best bet. They will already be familiar with Wyzant’s own online video chat platform and will be able to help you learn it as well. It is worth considering their reviews as well. How well does the average student rate this tutor’s lessons? This can give you an idea of how well-equipped they will be to aid you. ",
                    "A tutor’s rate is an important consideration. Only you can decide how much you wish to spend on Japanese lessons. The good news is that there are knowledgeable and dependable tutors available for every budget. By comparing their rate to their expertise, you can find the right balance for your needs.",
                    "There are even varying advantages and disadvantages between tutors who are native or non-native speakers of Japanese. A non-native speaker, on the one hand, has been in your shoes. They started from scratch just like you and have the insight on what it is like to be a beginner. On the other hand, a native speaker will have invaluable expertise on the intricacies and nuances of the language to guide you on your journey to fluency. ",
                    "Reaching out to a potential tutor on Wyzant is easy. Once you have chosen a tutor, all you need to do is go to their profile and find the “Contact [tutor’s name]” button. From there, you will be able to fill out what you are looking for in a lesson such as: subject, your level of experience, when you want to start, and a message to the tutor describing what it is you are looking for.\nWhile the message is optional, providing as much information as you can to the tutor is the best way to start on the right foot and also help the tutor give you the best first lesson possible. For example, by telling a tutor that you are in a college Japanese 101 class and which textbook you use, the tutor will already have an idea of what basic skills you already possess and what questions you are likely to have.",
                    "Online tutoring is popular on Wyzant, and it is easy to see why. Your options for tutors increase exponentially when you can choose a tutor hundreds of miles away from you rather than limiting yourself to those in your area. It is also easy to send files and resources in a matter of seconds. Wyzant’s online video chat platform is also equipped with all the tools you will need for a smooth learning experience.\nSome may prefer in-person tutoring, which has its own set of advantages. For example, technology is no longer a barrier when you meet in-person: no internet or computer required! You may also feel more at ease by meeting your tutor face-to-face. ",
                    "Once you and your tutor have introduced yourselves, it is time to dig into the topic at hand. Be honest with your tutor about your current skill level in Japanese. Have you already mastered reading hiragana but are struggling with how to read katakana? Did you take classes in college and now want to brush up years later? Sharing this information with your tutor allows them to help you create a learning plan for future lessons.\nNext, it’s time to set your goals: what is it you are hoping to achieve in these lessons? If you are already taking Japanese classes at school and are looking for someone to guide you through homework assignments and provide supplemental information, let your tutor know what your syllabus looks like and what your tests and quizzes will be assessing."
                ]
            },

            {
                topic: 'Why Do I Need Statistics?',
                image: 'https://blog.wyzant.com/wp-content/uploads/2023/08/Why-Do-I-need-Statistics.png',
                titles: [ "What does statistics mean?", 
                    "Why learn statistics?",
                    "Developing cognitive skills ",
                    "Critical thinking",
                    "Analytical thinking",
                    "Logic",
                    "Problem-solving",
                    "How statistics helps in learning these skills"


                ],
                contents: ["Defined by Oxford Languages as, “the practice or science of collecting and analyzing numerical data in large quantities, especially for the purpose of inferring proportions in a whole from those in a representative sample,” statistics help us quantify and describe complex phenomena, assess the reliability of information, and evaluate the impact of interventions or policies.", 
                    "Whatever the motivations for learning are, statistics gives the learner many outside conducting statistical analyses. Statistics helps develop skills like cognitive reasoning, data collection and organization, communication, and a greater understanding of statistical research.",
                    "Critical thinking, analytical thinking, logic, and problem-solving are all interconnected cognitive skills that play significant roles in learning statistics.",
                    "Critical thinking is the ability to objectively analyze and evaluate information, ideas, or situations. It involves questioning assumptions, considering different perspectives, and forming well-reasoned judgments. In statistics, critical thinking is vital for interpreting data, assessing the validity of statistical analyses, and drawing meaningful conclusions from the results.",
                    "Analytical thinking is a cognitive skill focused on breaking down complex problems or information into smaller components to understand their underlying structure or relationships. In statistics, students use analytical thinking when exploring datasets, identifying patterns, and selecting appropriate statistical methods to address specific research questions.",
                    "Logic is the systematic reasoning process that follows a set of rules and principles to arrive at valid conclusions. In statistics, logical thinking is applied when designing experiments, forming hypotheses, and constructing valid arguments based on statistical evidence. Following logical procedures is essential to ensure the integrity and reliability of statistical analyses.",
                    "Problem-solving is the process of identifying challenges, analyzing them, and finding effective solutions. Statistics offers tools and methodologies for addressing real-world problems through data analysis, hypothesis testing, and drawing conclusions based on evidence. Students learn problem-solving through applying statistical techniques to practical situations and interpreting the results to make informed decisions.",
                    "Learning statistics improves critical thinking, logic, problem-solving, and analytical skills through a combination of active engagement with data, rigorous evaluation of evidence, and practical application of statistical methods. Statistics requires students to question, analyze, and evaluate data and findings. By critically examining assumptions, methodologies, and conclusions, learners develop a keen eye for detecting biases and potential pitfalls in statistical analyses. This critical evaluation fosters a deeper understanding of the strengths and limitations of statistical evidence, enabling students to make well-informed judgments and draw reliable conclusions."
                ]
            },

            {
                topic: 'How to Type French Accent Marks: 42 Keyboard Shortcuts',
                image: 'https://blog.wyzant.com/wp-content/uploads/2020/04/How-to-Type-French-Accent-Marks-42-Keyboard-Shortcuts.png',
                titles: [
                    "Inserting French accent marks in word processors",
                    "GoogleDocs",
                    "Microsoft Word",
                    "Mac",
                    "KeyCaps",
                    "Accent mark shortcuts for mobile devices",
                    "Windows International Keyboard add-ons",
                    "International Keyboard accent codes"
                ],
                contents: ["Microsoft Word, Google Docs, and Mac computers all have features that allow you to insert special characters that don’t appear on the keys. This is the most intuitive way to type French accent marks.", 
                    "In Google Docs, start by clicking “Insert”, then “Special Characters.” Two drop-down menus and a grid of symbols will pop up. Select “Latin” from the first drop-down menu, and then select the accented letter you want to type from the grid. Easy!",
                    "In Microsoft Word, also start by clicking “Insert.” Next, click “Symbol.” A grid of symbols will pop up. If the one you’re looking for is not on there, click “More Symbols” at the bottom. You’ll see two drop-down menus and a grid. Select “Basic Latin” from the second drop-down menu, select the accented letter you want to type from the grid, and click “Insert.”",
                    "On a Mac, start by clicking “Edit” in the menu bar. Then choose “Special Characters” and select “Roman” from the drop-down menu. Next, select the “Accented Latin” character palette. Then, click the character you want to type, and hit “Insert”.",
                    "To use KeyCaps to type French accent marks, click on the little Apple logo on the top left side of your screen. Next, open KeyCaps. A little keyboard will appear on the screen. Hold down the Option key until a series of accent marks appears. Click on the French accent mark you wish to type, then type the letter that it modifies. For example, if you wanted to type é, click `, and then type the E. Et voila.",
                    "For iPhone, Android, and tablet keyboards, hold down any letter, and French accent options will appear (with other non-French accents, as well). In a nutshell, if you want to type “e” with an accent, hold down the “E” key, and you’ll instantly see these options pop up: è é ê ë ē ĕ ė ę ě and ə. Just click the one you’re looking for, and keep on writing.",
                    "The International Keyboard is the most user-friendly to US-based users who are used to a QWERTY-style layout. The French Keyboard is AZERTY and has several keys in different places than a US English keyboard. That makes switching back and forth confusing. The Canadian French keyboard has all the un-modified letters in the same spots, but has some additional characters.",
                    "When you use the International Keyboard, you have to watch out when typing quotation marks and apostrophes before letters that accents aigu, cédilles, and trémas typically modify. If you do not put an extra space between the punctuation and the letter, it will assume that you want the accent mark."
                ]
            },

            {
                topic: 'The Electoral College Explained in Under 5 Minutes',
                image: 'https://blog.wyzant.com/wp-content/uploads/2020/09/The-Electoral-College-Explained-in-Under-5-mins.png',
                titles: [ "First off…what is the Electoral College?", 
                    "But wait…don’t the citizens of the US elect the president?",
                    "So, do electors have to vote a certain way?",
                    "Why is this how we vote?",
                    "There are two types of voting results: THE POPULAR VOTE and THE ELECTORAL VOTE",
                ],
                contents: ["Established in Article II, Section 1 of the U.S. Constitution, the Electoral College is the formal body which elects the President and Vice President of the United States. ", 
                    "Well, yes, but not directly. When people vote for president they are really voting for an Elector from their state. They’re the ones who cast the votes that decide the election. Each state has as many Electors in the Electoral College as it has Representatives in the House, and Senators in Congress. The District of Columbia has three. That’s a total of 538 Electors. Each one casts a vote, and those votes are tallied to get the results of an election. A presidential nominee only needs half plus one – 270 electoral votes – to win.",
                    "It depends on the state. In 29 states there are laws requiring that electors vote the same as the people who voted for them. Most of the time they vote as expected, but in rare cases have changed their vote and voted for a different candidate than the people who voted for them. A “faithless elector” is someone who casts their electoral vote for someone other than the candidate they pledged to elect. It’s happened 157 times in US history.",
                    "When the US was founded in the late 18th Century, a national presidential campaign like we know today was virtually impossible. The country was just too big, and also…no computers or cell phones. Accurately figuring out the popular vote would have been a monumental undertaking.",
                    "The Popular Vote is the total number of votes cast for a candidate by voters in all 50 states. The Electoral Vote is what it sounds like: the votes cast for a candidate by each state’s Electors. The Electoral College system has actually been changed three times, via the 12th, 20th, and 23rd Amendments. It would take another to do away with the system altogether.",
                ]
            },

            {
                topic: 'How to Type Katakana in device',
                image: 'https://blog.wyzant.com/wp-content/uploads/2024/02/a-kid-using-ipad-lying-on-the-green-grass-backyard-2023-11-27-05-30-49-utc-scaled.jpg',
                titles: [ "How to install a katakana keyboard", 
                    "On Mac",
                    "On PC",
                    "Converting words from hiragana to katakana",
                    "On smartphone (iPhone and Android)",
                    "On computer (Mac and PC)",
                    "Romaji/qwerty inputs for katakana",
                    "Katakana with dakuten/”tenten”"


                ],
                contents: ["If you do have a Japanese keyboard installed, you are actually already enabled to type words in katakana! Even while hiragana is set as the default output, you are able to convert words you type into katakana ー this is in fact the most common way people write words in katakana. We will cover how to do this in detail later. Converting words is a skill you’ll need in order to type in kanji as well, so it’s good to first master it with katakana. Since a katakana keyboard is not strictly necessary, smartphones typically don’t even give you that as an option.", 
                    "When you initially install a Japanese keyboard on a Mac, you navigate from System preferences -> Keyboard -> Input sources. If “Japanese – Romaji” is already installed on your device, it will be listed as a language. To add a katakana keyboard, click “Japanese – Romaji.” You will be shown a list of options. Under “Input modes,” check the box next to “Katakana.” With that, you have a separate katakana keyboard on your device! To access your katakana keyboard, you’ll click the language icon on your menu bar at the top of the screen. It may look like a flag or an あ hiragana. You’ll be given a list of options, including “ア Katakana.” ",
                    "If you install a Japanese keyboard on PC, it will automatically install a katakana keyboard option. To access it, first look for the language icon. If it currently looks like “ENG,” left-click and set it to Japanese. If it currently looks like a capital “A” or the hiragana “あ,” right-click. You’ll be given a list of possible options. Click “Full-width Katakana.”",
                    "While it is possible to set some keyboards to automatically convert your romaji to katakana, it typically isn’t preferred. This is because natural Japanese has a mix of hiragana, katakana, and kanji, so you’d have to frequently switch your keyboard back and forth. The more common way people type katakana words is to type the word in hiragana, and afterwards convert it to katakana. Smartphones and computers go about this a slightly different way. Next we’ll go over the steps for each type of device.",
                    "If you’re comfortable with using the autocorrect function, converting words from hiragana to katakana is largely like relying on that, but on a larger scale. For example, try typing in the hiragana “あ.” You’ll notice that you’ll automatically be given some word suggestions that start with あ.",
                    "If your computer is set to output Japanese hiragana, start typing your word. You’ll automatically be given suggestions in a scroll-down menu. For example, I started out by just typing in “a,” which gave me a hiragana “あ”. Within that list of suggestions, I was already given the option to convert to the ア katakana! You might even be able to find your word by clicking on the arrows at the bottom of the menu. However, it’s generally more efficient to type more of the word and then convert it, so I’ll continue.",
                    "As with hiragana, the correct romaji is largely intuitive. If your keyboard is set up to automatically output katakana, typing the romaji will automatically give you the katakana. If you’re converting, you’ll need to make sure your romaji input/spelling is accurate before you can convert to katakana. The same romaji can be used for any device.",
                    "When using romaji, dakuten (otherwise colloquially referred to as “tenten”) will automatically be added if you’ve typed the correct input. Again the required inputs for katakana are largely intuitive with the sounds of the characters."
                ]
            },

        ]
        , [])
        const [lession, setLession] = useState(lessions[0]);

        const handleClick = (lession) =>{
            setLession(lession)
        }
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
                        { lession != null && <div className={cx('container__lession-title')}>
                                <h1>{lession.topic}</h1>
                                <img src={lession.image} alt='learnmore'></img>
                                {
                                    lession.titles.map((title, index) =>{
                                        return (
                                            <div  key ={index}>
                                                <h5>{title}</h5>
                                                <p>{lession.contents[index]}</p>
                                            </div>
                                        )
                                    })
                                }
                        </div>}
                    </Col>
                    {
                    <Col lg='3' className={cx('container__content')}>
                            <h3 className="text__header">
                                <span className="inner-arrow">Population Post</span>
                            </h3>
                        {lessions.map((lession, index)=>{
                            return (
                                <div >
                                   {index !== 0 &&  <div  key ={index} className={cx('container__items')} onClick={() => handleClick(lession)}>
                                        <div  className={cx('container__content-pic')}>
                                            <img src={lession.image} alt='noImage'></img>
                                        </div>
                                        <div>
                                            <div className={cx('container__content-title')}>
                                                <h4>{lession.topic}</h4>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            )
                        })}
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default LearnMore;