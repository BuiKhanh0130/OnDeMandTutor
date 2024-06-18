import React from 'react'
import styles from './MainDash.module.scss'
import classNames from 'classnames/bind'
import Cards from '../Cards'

const cx = classNames.bind(styles)

const MainDash = () => {
  return (
    <div className={cx('MainDash')}>
        <h1>Dashboard</h1>
        <Cards/>
    </div>
  )
}

export default MainDash