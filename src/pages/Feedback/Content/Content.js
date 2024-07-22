import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';

import { StarIcon, NoStarIcon } from '~/components/Icons';
import Button from '~/components/Button';

import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content({ stars, setStars, handleDsc, sendFeedback }) {
    return (
        <Col lg="8" className={cx('container__star')}>
            <span>Choose your stars fit with tutor</span>
            <div className={cx('container__star-items')}>
                {[...Array(stars)].map((_, index) => (
                    <div
                        className={cx('container__star-item')}
                        onClick={() => {
                            setStars(index + 1);
                        }}
                    >
                        <StarIcon key={index} className={cx('container__star-item-icon-star')} />
                    </div>
                ))}
                {[...Array(5 - stars)].map((_, index) => (
                    <div
                        className={cx('container__star-item')}
                        onClick={() => {
                            setStars(stars + index + 1);
                        }}
                    >
                        <NoStarIcon className={cx('container__star-item-icon')} key={index + stars} />
                    </div>
                ))}
            </div>
            <label id="description">Description</label>
            <textarea rows={14} cols={100} id="description" onChange={handleDsc}></textarea>
            <Button orange onClick={sendFeedback}>
                Send
            </Button>
        </Col>
    );
}

export default Content;
