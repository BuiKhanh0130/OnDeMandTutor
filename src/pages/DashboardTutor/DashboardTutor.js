import React from 'react'
import styles from './DashboardTutor.module.scss'
import classNames from 'classnames/bind'
import SidebarTutor from './components/SidebarTutor'
import MainDash from './components/MainDash'
import Contact from './components/Contact'
const cx = classNames.bind(styles)

const DashboardTutor = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("AppGlass")}>
            <SidebarTutor/>
            <MainDash/>
            <Contact/>
      </div>
    </div>
  )
}

export default DashboardTutor