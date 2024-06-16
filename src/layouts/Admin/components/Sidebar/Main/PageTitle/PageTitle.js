import classNames from 'classnames/bind';

import styles from './PageTitle.module.scss';

const cx = classNames.bind(styles);

function PageTitle({ page }) {
    return (
        <div className={cx('wrapper')}>
            <h1>{page}</h1>
            <nav>
                <ol className={cx('breadcrumb')}>
                    <li className={cx('breadcrumb-item')}>
                        <a href="/">
                            <i className={cx('bi bi-house-door')}></i>
                        </a>
                    </li>
                    <li className={cx('breadcrumb-item active')}>{page}</li>
                </ol>
            </nav>
        </div>
    );
}

export default PageTitle;
