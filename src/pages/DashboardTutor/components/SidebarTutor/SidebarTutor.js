import React, { useState } from 'react'
import images from '~/assets/images'
import styles from './SidebarTutor.module.scss'
import classNames from 'classnames/bind'
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";

const cx = classNames.bind(styles)

const SidebarTutor = () => {

    const SidebarData = [
        {
          icon: UilEstate,
          heading: "Dashboard",
        },
        {
          icon: UilClipboardAlt,
          heading: "Lession",
        },
        {
          icon: UilUsersAlt,
          heading: "Student",
        },
        {
          icon: UilPackage,
          heading: 'Feedback'
        },
        {
          icon: UilChart,
          heading: 'Transaction'
        },
      ];

      const [selected, setSelected] = useState(0)


  return (
    <div className={cx('SidebarTutor')}>
        <div className={cx('Menu')}>
            {SidebarData.map((item, index) => {
                return (
                    <div className={selected === index ? cx('MenuItem', 'active') : cx('MenuItem')} key={index} onClick={() => setSelected(index)}>
                        <item.icon className={cx('MenuIcon')} />
                        <span className={cx('MenuText')}>{item.heading}</span>
                    </div>
                )
            })}
            
            <div className={cx('MenuItem')}>
                        <UilSignOutAlt/>
                    </div>
        </div>
        </div>
  )
}

export default SidebarTutor