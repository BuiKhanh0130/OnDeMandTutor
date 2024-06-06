import classNames from 'classnames/bind';
import { useMemo } from 'react';

import styles from './Sidebar.module.scss';

import config from '~/config';
import Menu from './Menu';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebarItems = useMemo(
        () => [
            {
                title: 'Find a Tutor',
                items: [
                    { label: 'Search for Tutors', link: config.routes.findtutor },
                    { label: 'Request a Tutor', link: config.routes.requestTutor },
                    { label: 'Online Tutoring', link: config.routes.onlineTutoring },
                ],
            },

            {
                title: 'How It Works',
                items: [
                    { label: 'For Student', link: config.routes.forStudent },
                    { label: 'FAQ', link: config.routes.home },
                    { label: 'What Customers Say', link: config.routes.home },
                ],
            },

            {
                title: 'Resources',
                items: [
                    { label: 'Ask An Expert', link: config.routes.home },
                    { label: 'Lesson', link: config.routes.home },
                    { label: 'Blog', link: config.routes.home },
                ],
            },

            {
                title: 'Become a Tutor',
                items: [
                    { label: 'Apply Now', link: config.routes.profile },
                    { label: 'About Tutoring Jobs', link: config.routes.home },
                    { label: 'Find Tutoring Jobs', link: config.routes.home },
                    { label: 'How It Works For Tutors', link: config.routes.home },
                    { label: 'FAQ', link: config.routes.home },
                ],
            },

            {
                title: 'About Us ',
                items: [
                    { label: 'About Us', link: config.routes.home },
                    { label: 'Careers', link: config.routes.home },
                    { label: 'Contact Us', link: config.routes.home },
                ],
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
                            <div className={cx('menu-item-title')}>
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
