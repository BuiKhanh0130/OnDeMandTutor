import classNames from 'classnames/bind';
import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

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
            { title: 'Contacts', lists: [{ label: '1309 Beacon Street, Suite 300, Brookline, MA, 02446' }] },
            {
                title: 'Support',
                lists: [{ label: 'Need any help?' }],
            },
        ],
        [],
    );

    return (
        <div className={cx('Footer')}>
            <div className={cx('footer-container')}>
                {items.map((itemChildren, index) => {
                    return (
                        <div key={index} className={cx('footer_content')}>
                            <div className={cx('footer_content-title')}>{itemChildren.title}</div>
                            <div className={cx('footer_content-link')}>
                                {itemChildren.lists.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Link to={item.title}>
                                                {item.icon && (
                                                    <item.icon className={cx('footer_content-icon')}></item.icon>
                                                )}
                                                <div className={cx('footer_content-label')}>{item.label}</div>
                                            </Link>
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Footer;
