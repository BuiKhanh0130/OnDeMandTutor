import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaceBookIcon, LineIcon, TelegramIcon, InstagramIcon } from '~/components/Icons';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const items = useMemo(
        () => [
            {
                title: 'ABOUT US',
                lists: [
                    {
                        label: 'Who we are',
                    },
                    {
                        label: 'How it works',
                    },
                    {
                        label: 'Preply reviews',
                    },
                    {
                        label: 'Work at Preply',
                    },
                    {
                        label: 'Status',
                    },
                    {
                        label: 'Preply Live',
                    },
                    {
                        label: 'Preply Research and Studies',
                    },
                    {
                        label: 'We stand with Ukraine',
                    },
                    {
                        label: 'Media kit',
                    },
                ],
            },
            {
                title: 'FOR STUDENTS',
                lists: [
                    {
                        label: 'Preply Blog',
                    },
                    {
                        label: 'Questions and Answers',
                    },
                    {
                        label: 'Student discount',
                    },
                    {
                        label: 'Referral program',
                    },
                    {
                        label: 'English level test',
                    },
                    {
                        label: 'English Vocabulary test',
                    },
                    {
                        label: 'Free English courses',
                    },
                    {
                        label: 'Preply discounts',
                    },
                ],
            },
            {
                title: 'FOR TUTORS',
                lists: [
                    { label: 'Become an online tutor' },
                    { label: 'Teach English online' },
                    { label: 'Teach French online' },
                    { label: 'Teach Spanish online' },
                    { label: 'Teach German online' },
                    { label: 'See all online tutoring. jobs' },
                ],
            },
            {
                title: `LET'S KEEP IN TOUCH`,
                lists: [
                    {
                        icon: FaceBookIcon,
                        label: 'Facebook',
                    },
                    {
                        icon: TelegramIcon,
                        label: 'Telegram',
                    },
                    {
                        icon: LineIcon,
                        label: 'Line',
                    },
                    {
                        icon: InstagramIcon,
                        label: 'Instagram',
                    },
                ],
            },
            { title: 'CONTACTS', lists: [{ label: '1309 Beacon Street, Suite 300, Brookline, MA, 02446' }] },
            {
                title: 'SUPPORT',
                lists: [{ label: 'Need any help?' }],
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row className={cx('container')}>
                    {items.map((itemChildren, index) => {
                        return (
                            <Col lg="2" key={index} className={cx('container__content')}>
                                <div className={cx('container__content-title')}>{itemChildren.title}</div>
                                <div className={cx('container__content-link')}>
                                    {itemChildren.lists.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <Link to={item.title}>
                                                    {item.icon && (
                                                        <item.icon
                                                            className={cx('container__content-icon')}
                                                        ></item.icon>
                                                    )}
                                                    <div className={cx('container__content-label')}>{item.label}</div>
                                                </Link>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
