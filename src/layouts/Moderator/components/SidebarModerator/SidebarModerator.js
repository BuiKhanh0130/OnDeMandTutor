import React, { useState } from 'react';
// import images from '~/assets/images'
import styles from './SidebarModerator.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { UilEstate, UilClipboardAlt, UilUsersAlt, UilPackage, UilChart, UilSignOutAlt } from '@iconscout/react-unicons';

const cx = classNames.bind(styles);

const SidebarTutor = ({ index }) => {
    const SidebarData = [
        {
            icon: UilEstate,
            heading: 'Dashboard',
            link: '/moderator',
        },
        {
            icon: UilClipboardAlt,
            heading: 'Classes',
            link: '/moderator/maindash',
        },
        {
            icon: UilUsersAlt,
            heading: 'Advertisement',
            link: '/moderator/advertisement',
        },
        {
            icon: UilPackage,
            heading: 'Withdrawal request',
            link: '/moderator/withdrawal',
        }
    ];

    const [selected, setSelected] = useState(index ? index : 0);

    return (
        <div className={cx('SidebarTutor')}>
            <div className={cx('Menu')}>
                {SidebarData.map((item, index) => {
                    return item.link ? (
                        <Link key={index} to={item.link}>
                            <div
                                className={selected === index ? cx('MenuItem', 'active') : cx('MenuItem')}
                                key={index}
                                onClick={() => setSelected(index)}
                            >
                                <item.icon className={cx('MenuIcon')} />
                                <span className={cx('MenuText')}>{item.heading}</span>
                            </div>
                        </Link>
                    ) : (
                        <div
                            className={selected === index ? cx('MenuItem', 'active') : cx('MenuItem')}
                            key={index}
                            onClick={() => setSelected(index)}
                        >
                            <item.icon className={cx('MenuIcon')} />
                            <span className={cx('MenuText')}>{item.heading}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SidebarTutor;
