import React from 'react'
import images from '~/assets/images'
import styles from './Contact.module.scss'
import classNames from 'classnames/bind'
import Feeback from '../Feedback'

const cx = classNames.bind(styles)

const Contact = () => {

    const Customers = [
        {
          img: images.dashboard1,
          name: "BuiKhanh",
          mess: "I want to improve my Math score.",
          time: "25 seconds ago",
        },
        {
          img: images.dashboard2,
          name: "HoangPhuc",
          mess: "How much do I have to pay for this course?",
          time: "30 minutes ago",
        },
        {
          img: images.dashboard3,
          name: "QuynhNhu",
          mess: "You: I will meet all your conditions",
          time: "2 hours ago",
        },
        {
          img: images.dashboard4,
          name: "NhuTam",
          mess: "Do you have a master's degree?",
          time: "5 hours ago",
        },
        {
          img: images.dashboard5,
          name: "VanLam",
          mess: "I want to review Chemistry in 1 month.",
          time: "10 hours ago",
        },
      ];

  return (
    <div className={cx("RecentContact")}>
        <h3>Recent Contacts</h3>
      {Customers.map((update, index) => {
        return (
          <div key={index} className={cx("Contact")}>
            <img src={update.img} alt="profile" />
            <div className={cx("mess")}>
              <div  style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span> <br/>
                <span> {update.mess}</span>
              </div>
                <span>{update.time}</span>
            </div>
          </div>
        );
      })}
       <h3>Feedback</h3>
       <div className={cx("Feedback")}>
            <Feeback/>
       </div>
    </div>
  )
}

export default Contact