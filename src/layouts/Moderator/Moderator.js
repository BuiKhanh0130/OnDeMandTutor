import classNames from 'classnames/bind';

import styles from './Moderator.module.scss';
import HeaderModerator from './components/HeaderModerator';
import SidebarModerator from './components/SidebarModerator';

const cx = classNames.bind(styles);

function Moderator({ children }) {
    return (
        <>
            <HeaderModerator />
            <div className={cx('wrapper')}>
                <div className={cx('AppGlass')}>
                    <SidebarModerator />
                    {children}
                </div>
            </div>
        </>
    );
}

export default Moderator;
