import classNames from 'classnames/bind';

import images from '~/assets/images';

import styles from './NewsPostItem.module.scss';

const cx = classNames.bind(styles);

function NewsPostItem({ item }) {
    return (
        <div className={cx('post-item', 'clearfix')}>
            <img src={images.avatar} alt="nt"></img>
            <h4>
                <a href="/">{item.title}</a>
            </h4>
            <p>{item.subtitle}</p>
        </div>
    );
}

export default NewsPostItem;
