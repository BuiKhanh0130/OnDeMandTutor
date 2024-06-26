import React from 'react'
import classNames from 'classnames/bind'
import styles from './Messages.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Search from '~/components/Search';
import images from '~/assets/images'
const cx = classNames.bind(styles)

const Messages = () => {

    const Interactors = [
        {
            name: 'ThanhPhong',
            avatar: images.tutor,

        },
        {
            name: 'BuiKhanh',
            avatar: images.dashboard1
        },
        {
            name: 'V.NhuTam',
            avatar: images.dashboard4
        },
        {
            name: 'V.NhuQuynh',
            avatar: images.dashboard3
        },
        {
            name: 'PhucHoang',
            avatar: images.dashboard2
        },
        {
            name: 'VanLam',
            avatar: images.dashboard5
        }
    ]

  return (

    <div className={cx('wrapper')}>
    <Container className={cx('container')}>
    <Row >
        <Col lg='4'className={cx('container_user')}>
        <Row>
            <Col lg='3' className={cx('container_text')}>
                <span>Messages</span>
            </Col>
            <Col lg='9'>
                <Search width="300px"/>
            </Col>
        </Row>
            <Row className={cx('container_user_item')} >

                {
                    Interactors.map((user, index) =>{
                        return(
                            <Col key={index} lg='12' className={cx('container_user_detail')}>
                                <img alt="react" src={user.avatar}></img>
                                <Row className={cx('user_item')}>
                                    <Col className={cx('content-left')}>
                                        <Row>
                                            <span>{user.name}</span>
                                        </Row>
                                        <Row>
                                            <p>You: I want to contact more</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })
                }
            </Row>
        </Col>
        <Col lg='8' className={cx('container__mess_detail')}>
            <Row >
                <Col lg='12' className={cx('container__mess_header')}>
                        <img alt="react" src={Interactors[0].avatar}></img>
                    <Row>
                        <span>{Interactors[0].name}</span>
                    </Row>
                </Col>
            </Row>
            <Row>
                    <Col lg='12' className={cx('container__mess_chatbox')}>

                    </Col>
            </Row>
            <Row>
                <Col lg='12' className={cx('container__type_message')}>
                    <input type='text' className={cx('type_message')} />
                        <i className={cx('send_icon')}>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="Blue" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </i>
                </Col>
            </Row>
        </Col>
    </Row>
    </Container>
</div>
  )
}

export default Messages