import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
    return (
        <div className={cx('search-bar')}>
            <form className={cx('search-form', 'd-flex', 'align-items-center')} method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                <button type="submit" title="Search">
                    <i className={cx('bi bi-search')}></i>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
