import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import { MoveIcon } from '~/components/Icons';

import styles from './ScrollToTop.module.scss';

const cx = classNames.bind(styles);

function ScrollToTop() {
    const [status, setStatus] = useState(false);
    // const [width, setWidth] = useState(window.innerWidth);

    useState(() => {
        // const GoToTop = () => {
        //     setState(window.scrollY >= 200);
        // };
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 50) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        });
        // window.addEventListener('scroll', GoToTop);

        // return () => {
        //     window.removeEventListener('scroll', GoToTop);
        // };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            {status && (
                <Button className={cx('btn-back-top')} onClick={handleClick}>
                    <MoveIcon />
                </Button>
            )}
        </div>
    );
}

export default ScrollToTop;
