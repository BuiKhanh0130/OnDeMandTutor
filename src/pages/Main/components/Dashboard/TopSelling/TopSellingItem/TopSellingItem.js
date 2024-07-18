import classNames from 'classnames/bind';

import styles from './TopSellingItem.module.scss';

const cx = classNames.bind(styles);

function TopSellingItem({ item }) {
    return (
        <tr>
            <th scope="row">
                <a href="/">
                    <img src={item.preview} alt=""></img>
                </a>
            </th>
            <td>
                <a href="/" className={cx('text-primary fw-bold')}>
                    {item.name}
                </a>
            </td>
            <td>${item.price.toFixed(2)}</td>
            <td className={cx('fw-bold')}>{item.sold}</td>
            <td>${(item.price * item.sold).toLocaleString('en-US')}</td>
        </tr>
    );
}

export default TopSellingItem;
