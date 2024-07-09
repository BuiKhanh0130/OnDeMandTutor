import React, {useContext, useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './Wallet.module.scss';
import Image from '~/components/Image'; 
import { Container, Row, Col } from 'react-bootstrap';
import { ModalContext } from '~/components/ModalProvider';
import requests from '~/utils/request';

const cx = classNames.bind(styles);
const WALLET_URL = 'wallet/getwallet/'

const Wallet = () => {
    const {avatar, userId} = useContext(ModalContext);
    const [walletData, setWalletData] = useState(null);

    useEffect(()=>{
        const fetchWallet = async () => {
            try {
                const response = await requests.post(`${WALLET_URL}${userId}`);
                console.log(response.data);
                setWalletData(response.data);
            } catch (error) {
                
            }
        }
        fetchWallet();
    }, [userId])
    
    console.log(avatar, userId);

    const transactions = [
        { id: 1, date: '2023-10-01', amount: -100, description: 'Payment to ABC' },
        { id: 2, date: '2023-10-02', amount: 200, description: 'Received from XYZ' },
        { id: 3, date: '2023-10-03', amount: -50, description: 'Payment to DEF' },
    ];

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg='4' className={cx('wallet')}>
                        <div className={cx('wallet-header')}>
                            <Image src={avatar.avatar} alt="Avatar" className={cx('avatar')} />
                            <div className={cx('wallet-info')}>
                                <h2>Customer: {avatar.fullName}</h2>
                                <p>Created on: {walletData?.createDay}</p>
                            </div>
                        </div>
                        <div className={cx('wallet-details')}>
                            <p><strong>Balance:</strong> {walletData?.balance} VND</p>
                            <p><strong>Bank Name:</strong> {walletData?.bankName}</p>
                            <p><strong>Bank Number:</strong> {walletData?.bankNumber}</p>
                        </div>
                    </Col>
                    <Col lg='8'>
                        <div className={cx('wallet-transaction')}>
                            <h3>Transaction History</h3>
                            {transactions.length > 0 ? (
                                <ul className={cx('transaction-list')}>
                                    {transactions.map(transaction => (
                                        <li key={transaction.id} className={cx('transaction-item')}>
                                            <p><strong>Date:</strong> {transaction.date}</p>
                                            <p><strong>Amount:</strong> {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</p>
                                            <p><strong>Description:</strong> {transaction.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No transaction history found.</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Wallet;


