import styles from './Notification.module.scss'
import classNames from 'classnames/bind'
import { Container, Row, Col } from 'react-bootstrap'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios'
import requests from '~/utils/request';


import React, { useEffect, useState} from 'react'
import Search from '~/components/Search';
import images from '~/assets/images'
const cx = classNames.bind(styles)

const REQUEST_PAYMENT_URL = 'VnPay/create_payment_url'
const RESPONSE_PAYMENT_URL = 'VnPay/payment_return'

const Notification = () => {
    const [price, setPrice] = useState(10000);
    const [subject, setSubject] = useState("Math 12");
    const [hour, setHour] = useState(5);
    const [day, setDay] = useState(5);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('Vuilongthanhtoan');
    const [paymentId, setPaymentId] = useState(localStorage.getItem('paymentid'));

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search); 
      const paramsObject = {};

      for (const [key, value] of urlParams.entries()) {
        paramsObject[key] = value;
      }
      
        const responsePayment = async () => {
                try{
                    const response = await requests.post(`${RESPONSE_PAYMENT_URL}/${paymentId}`, paramsObject);
                    localStorage.removeItem('paymentid');
                    if (response.data === '00') {
                        window.location.href = 'http://localhost:3000'
                    }
                }catch(err){
                    console.log(err);
                }
            }
      responsePayment();
    }, [paymentId]);


    const handlePayment = async () => {
        try {
            const response = await requests.post(REQUEST_PAYMENT_URL, {
                walletId: 'Phong1',
                paymentDestinationId: '345951dc-4cba-4e4b-8c5b-4f54204f40b2',
                amount: price,
                description: encodeURIComponent(message)
            }
            );
            localStorage.setItem('paymentid', response.data.paymentId)
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            console.log(error);
        }
    }

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
    ]

  return (

    <div className={cx('wrapper')}>
    <Container className={cx('container')}>
    <Row >
        <Col lg='4'className={cx('container_user')}>
        <Row>
            <Col lg='3' className={cx('container_text')}>
                <span>Notifications</span>
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
                                            <p>ThanhPhong created a class with you</p>
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
                    {/* <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
                <Table sx={{ minWidth: 650, minHeight: 200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell align="left">Day/Week</TableCell>
                            <TableCell align="left">Hour/Day</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: 'white' }}>
                            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0,  fontSize: '15px' } }}>
                                <TableCell align="left">{subject}</TableCell>
                                <TableCell align="left">{day}</TableCell>
                                <TableCell align="left">{hour}</TableCell>
                                <TableCell align="left">{price}</TableCell>
                                <TableCell align="left">
                                    <span className="status">{description}</span>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    Detail
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> */}
                        {/* <Row className={cx('button_confirm')}>
                            <div >
                                <button className={cx("button_cancel")}>Cancel</button>
                            </div>
                            <div >
                                <button onClick={handlePayment} className={cx("button_accept")}>Accept</button>
                            </div>
                        </Row> */}

                        <span className={cx('header_noti')}>Hello Mrs.Nhi,</span>

                        <div className={cx('body_noti')}>
                            <p>ThanhPhong has created a new class for you on OnDemand Tutor. The class is called "Math 12" and will be used to teach Math.
                            </p>
                            <a href="/classes">Click here</a><span>, complete the formalities to join your class!</span>
                        </div>

                        <div className={cx('final_noti')}>
                            <p>Thank you for reading the announcement.</p>
                            <p>Best regards.</p>
                        </div>
                    </Col>
            </Row>
           
        </Col>
        
        </Row>
    </Container>
</div>
  )
}

export default Notification


