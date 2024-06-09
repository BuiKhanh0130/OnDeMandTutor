import classNames from 'classnames/bind';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p>Blog page</p>
            </div>
        </div>
    );
}

export default Blog;
