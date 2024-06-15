import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer id="footer" className={cx('footer')}>
            <div className={cx('copyright')}>
                &copy; Copyright{''}
                <strong>
                    <span> FPT Technology</span>
                </strong>
                . All Rights Reserved
            </div>
            <div className={cx('credits')}>
                Design by <a href="/">Bui Khanh</a>
            </div>
        </footer>
    );
}

export default Footer;
