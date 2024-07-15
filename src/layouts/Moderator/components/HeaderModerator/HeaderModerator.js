import classNames from 'classnames/bind';

import Logo from './Logo';
import SearchBar from './SearchBar';
import Nav from './Nav';

import styles from './HeaderModerator.module.scss';

const cx = classNames.bind(styles);

function HeaderModerator() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <header id="header" className={cx('header', 'fixed-top', 'd-flex', 'align-items-center')}>
                    {/* logo */}
                    <Logo />
                    {/* search bar */}
                    <SearchBar />
                    {/* nav */}
                    <Nav />
                </header>
            </div>
        </div>
    );
}

export default HeaderModerator;
