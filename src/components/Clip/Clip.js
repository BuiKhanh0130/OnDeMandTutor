import classNames from 'classnames/bind';

import styles from './Clip.module.scss';

const cx = classNames.bind(styles);

function Clip({ width, height, clip }) {
    return (
        <div className={cx('container__clip')}>
            <section>
                <iframe
                    width={width}
                    height={height}
                    src={clip}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </section>
        </div>
    );
}

export default Clip;
