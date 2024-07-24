import React from 'react';
import classNames from 'classnames/bind';
import styles from './WithdrawalRequest.module.scss';

const cx = classNames.bind(styles);

const WithdrawalRequest = () => {
  const data = [
    {
      createDay: '2023-10-01',
      bankCode: '001',
      bankName: 'Bank A',
      amount: 1000,
      description: 'Withdrawal for rent',
    },
    {
      createDay: '2023-10-02',
      bankCode: '002',
      bankName: 'Bank B',
      amount: 2000,
      description: 'Withdrawal for groceries',
    },
    // Add more data as needed
  ];

  return (
    <div className={cx('container')}>
      <h1>Withdrawal Request Form</h1>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th>CreateDay</th>
            <th>BankCode</th>
            <th>BankName</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.createDay}</td>
              <td>{item.bankCode}</td>
              <td>{item.bankName}</td>
              <td>{item.amount}</td>
              <td>{item.description}</td>
              <td>
                <button className={cx('accept-button')}>Accept</button>
              </td>
              <td>
                <button className={cx('reject-button')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalRequest;
