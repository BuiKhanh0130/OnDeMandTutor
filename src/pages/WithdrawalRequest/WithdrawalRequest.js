import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './WithdrawalRequest.module.scss';

const cx = classNames.bind(styles);

const SHOW_LIST_TUTOR = 'moderator/show_list_request_withdraw_money';
const BROWSE_WITHDRAW_URl = 'moderator/change_IsVa_TransactionPay';

const WithdrawalRequest = () => {
  const requestPrivate = useRequestsPrivate();
  const [status, setStatus] = useState(false);
  const [listWithDraw, setListWithDraw] = useState([]);
  console.log(status);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getList = async () => {
      const response = await requestPrivate.get(SHOW_LIST_TUTOR);
      console.log(response.data)
      isMounted && setListWithDraw(response.data);
      setStatus(false);
    }

    getList();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [status])

  const handleWithDraw = async (idTran, amount) => {
    try {
      const response = await requestPrivate.post(BROWSE_WITHDRAW_URl, JSON.stringify({ idTran, status: true, amount }));
      if (response.status === 200) {
        setStatus(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cx('container')}>
      <h1>Withdrawal Request Form</h1>
      {listWithDraw.length > 0 ? (<table className={cx('table')}>
        <thead>
          <tr>
            <th>BankCode</th>
            <th>BankName</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Description</th>
            <th>Accept</th>

          </tr>
        </thead>
        <tbody>
          {listWithDraw.length > 0 && listWithDraw.map((item, index) => (
            <tr key={index}>
              <td>{item.walletId}</td>
              <td>{item.bankName}</td>
              <td>{item.amount}</td>
              <td>{item.balance}</td>
              <td>{item.description}</td>
              <td>
                <button className={cx('accept-button')} onClick={() => {
                  handleWithDraw(
                    item.id,
                    item.amount
                  )
                }}>Accept</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : (<p style={{ fontSize: '3rem', color: 'red' }}>There no transaction need browsed</p>)}
    </div>
  );
};

export default WithdrawalRequest;
