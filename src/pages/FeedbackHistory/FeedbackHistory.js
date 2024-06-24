import React from 'react'
import SidebarTutor from '../DashboardTutor/components/SidebarTutor'
import styles from './FeedbackHistory.module.scss'
import classNames from 'classnames/bind'
import { Container, Row, Col } from 'react-bootstrap';
import TableFeeback from './components/Table'

const cx = classNames.bind(styles)

const FeedbackHistory = () => {
  return (
    <div className={cx("wrapper")}>
        <div className={cx("AppGlass")}>
            <SidebarTutor index={3}/>
            <TableFeeback/>
      </div>
    </div>
  )
}

export default FeedbackHistory