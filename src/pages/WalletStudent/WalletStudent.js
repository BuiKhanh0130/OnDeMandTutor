import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WalletStudent.module.scss';
import Image from '~/components/Image'; 
import { Container, Row, Col, Button} from 'react-bootstrap';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { FaEdit } from 'react-icons/fa';

const cx = classNames.bind(styles);
const WALLET_URL = 'wallet/get_wallet/';
const UPDATE_WALLET_URL = 'wallet/update_wallet';
const WITHDRAW_URL = 'wallet/withdraw_money/';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', options);
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
};

const WalletStudent = () => {
    const { avatar, userId } = useContext(ModalContext);
    const [walletData, setWalletData] = useState(null);
    const [bankName, setBankName] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [isEditingBankName, setIsEditingBankName] = useState(false);
    const [isEditingBankNumber, setIsEditingBankNumber] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const requestPrivate = useRequestsPrivate();

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const response = await requestPrivate.get(`${WALLET_URL}`);
                console.log(response.data);
                setWalletData(response.data);
                setBankName(response.data.bankName);
                setBankNumber(response.data.bankNumber);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTransaction = async () =>{
            try {
                const response = await requestPrivate.get('transaction/view_transactionlist');
                console.log(response.data);
                setTransactionData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchWallet();
        fetchTransaction();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            const response = await requestPrivate.put(`${UPDATE_WALLET_URL}?bankname=${bankName}&banknumber=${bankNumber}`);
            console.log(response.data);
            setWalletData(response.data);
            setIsEditingBankName(false);
            setIsEditingBankNumber(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleWithdraw = async () => {
        try {
            const response = await requestPrivate.post(`${WITHDRAW_URL}`);
            console.log(response.data);
            setWalletData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col lg='4' className={cx('wallet')}>
                        <div className={cx('wallet-header')}>
                            <Image src={avatar.avatar} alt="Avatar" className={cx('avatar')} />
                            <div className={cx('wallet-info')}>
                                <h2>Customer: {avatar.fullName}</h2>
                                <p>Created on: {walletData?.createDay ? formatDate(walletData.createDay) : 'N/A'}</p>
                            </div>
                        </div>
                        <div className={cx('wallet-details')}>
                            <p><strong>Balance:</strong> {walletData?.balance ? formatCurrency(walletData.balance) : 0} VND</p>

                            <div>
                                <p>
                                    <strong>Bank Name: </strong>
                                        {isEditingBankName ? (
                                            <input
                                                type="text"
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                            />
                                        ) : (
                                            <span>{bankName}</span>
                                        )}
                                        <FaEdit
                                            className={cx('edit-icon')}
                                            onClick={() => setIsEditingBankName(!isEditingBankName)}
                                        />
                                </p>

                                <p>
                                    <strong>Bank Number: </strong>
                                        {isEditingBankNumber ? (
                                            <input
                                                type="text"
                                                value={bankNumber}
                                                onChange={(e) => setBankNumber(e.target.value)}
                                            />
                                        ) : (
                                            <span>{bankNumber}</span>
                                        )}
                                        <FaEdit
                                            className={cx('edit-icon')}
                                            onClick={() => setIsEditingBankNumber(!isEditingBankNumber)}
                                        />
                                </p>
                                        <div className={cx('button_update')} >
                                            <Button onClick={handleUpdate}>Update</Button>
                                        </div>
                            </div>
                            <p className={cx('note')}>*Note: Please make sure your information is updated correctly.</p>

                            <div className={cx('button_withdraw')}>
                                <Button  onClick={handleWithdraw}>Withdraw</Button>
                            </div>
                        </div>
                    </Col>

                    <Col lg='8'>
                        <div className={cx('wallet_transaction')}>
                            <h3>Transaction History</h3>
                            {transactionData.length > 0 ? (
                                <div className={cx('transaction_list')}>
                                    <table className={cx('transaction_table')}>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactionData.map(transaction => (
                                                <tr key={transaction.id}>
                                                    <td>{formatDate(transaction.tranDate)}</td>
                                                    <td>{transaction.amount > 0 ? `-${transaction.amount}` : transaction.amount}</td>
                                                    <td>{transaction.description}</td>
                                                    <td>{transaction.isValid === true ? 'Success' : 'Fail'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

export default WalletStudent;
