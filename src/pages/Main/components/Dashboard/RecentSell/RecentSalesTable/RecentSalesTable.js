import classNames from 'classnames/bind';

import styles from './RecentSalesTable.module.scss';

const cx = classNames.bind(styles);

function RecentSalesTable({ items }) {
    const handleStatus = (status) => {
        switch (status) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Rejected':
                return 'danger';
            default:
                return 'success';
        }
    };

    return (
        <table className={cx('table', 'table-borderless', 'datatable')}>
            <thead className={cx('table-light')}>
                <tr>
                    <th scope={cx('col')}>#</th>
                    <th scope={cx('col')}>Customer</th>
                    <th scope={cx('col')}>Product</th>
                    <th scope={cx('col')}>Price</th>
                    <th scope={cx('col')}>Status</th>
                </tr>
            </thead>
            <tbody>
                {items &&
                    items.length > 0 &&
                    items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <a href="/">{item.number}</a>
                            </td>
                            <td>{item.customer}</td>
                            <td>
                                <a href="/">{item.product}</a>
                            </td>
                            <td>
                                <a href="/">${item.price.toFixed(2)}</a>
                            </td>
                            <td>
                                <span className={cx('badge', `bg-${handleStatus(item.status)}`)}>{item.status}</span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default RecentSalesTable;
