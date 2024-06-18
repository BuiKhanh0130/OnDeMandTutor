import classNames from 'classnames/bind';
import { useMemo } from 'react';

import styles from './Sidebar.module.scss';

import config from '~/config';
import Menu from '~/layouts/DefaultLayout/components/Sidebar/Menu';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebarItems = useMemo(
        () => [
            {
                title: 'Dashboard',
                // items: [{ label: 'Dashboard', link: config.routes.dashboardTutor }],
            },

            {
                title: 'How It Works',
                items: [
                    { label: 'For Student', link: '/forStudent' },
                    { label: 'What Customers Say', link: '/customerSay' },
                ],
            },

            {
                title: 'My Business',
                items: [
                    { label: 'News', link: '/advertisement' },
                    { label: 'Student\'s Post', link: '/blog' },
                    { label: 'Advertisement', link: '/blog' },
                ],
            },

            {
                title: 'Become a Expert',
                items: [
                    { label: 'Learn More', link: '/learnMore' },
                    { label: 'How Tutors Work', link: '/howItWork' },
                    { label: '5 Tips For Success', link: '/tipSuccess' },
                ],
            },

            {
                title: 'About Us ',
                items: [{ label: 'About Us', link: config.routes.aboutUs }],
            },
        ],
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {sidebarItems.map((sidebarItem, index) => {
                        if (sidebarItem.items !== undefined) {
                            return (<Menu key={index} items={sidebarItem.items}>
                                <div key = {index} className={cx('menu__item-title')}>
                                    <span>{sidebarItem.title}</span>
                                </div>
                            </Menu>)
                        } else {
                            return(
                                <Link to="/dashboardTutor">
                                    <div key = {index} className={cx('notmenu__item-title')}>
                                        <span>
                                            {sidebarItem.title}
                                        </span>
                                    </div>
                                </Link>
                            )
                        }   
                    })}
            </div>
        </div>
    );
}

export default Sidebar;
