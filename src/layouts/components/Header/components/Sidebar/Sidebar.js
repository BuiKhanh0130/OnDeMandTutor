import classNames from 'classnames/bind';
import { useMemo } from 'react';

import Menu from './Menu';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebarItems = useMemo(
        () => [
            {
                title: 'Find a Tutor',
                items: [
                    { label: 'Search for Tutors', link: '/findTutor' },
                    { label: 'Request a Tutor', link: '/requestTutor' },
                    { label: 'Online Tutoring', link: '/onlineTutoring' },
                ],
            },

            {
                title: 'How It Works',
                items: [
                    { label: 'For Student', link: '/forStudent' },
                    { label: 'What Customers Say', link: '/customerSay' },
                ],
            },

            {
                title: 'Resources',
                items: [
                    { label: 'News', link: '/advertisement' },
                    { label: 'Blog', link: '/blog' },
                ],
            },

            {
                title: 'Become a Tutor',
                items: [
                    { label: 'Apply Now', link: '/registration/tutor/step1' },
                    { label: 'How It Works For Tutors', link: '/howItWork' },
                ],
            },

            {
                title: 'About Us ',
                items: [{ label: 'About Us', link: '/aboutUs' }],
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {sidebarItems.map((sidebarItem, index) => {
                    return (
                        <Menu key={index} items={sidebarItem.items}>
                            <div key={index} className={cx('menu__item-title')}>
                                <span>{sidebarItem.title}</span>
                            </div>
                        </Menu>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
