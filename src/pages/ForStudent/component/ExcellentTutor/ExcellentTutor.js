import classNames from 'classnames/bind';

import images from '~/assets/images';
import Image from '~/components/Image';
import { StarIcon } from '~/components/Icons';

import styles from './ExcellentTutor.module.scss';

const cx = classNames.bind(styles);

function ExcellentTutor() {
    return (
        <div className={cx('slide')}>
            <div className={cx('container__tutors-card')}>
                <Image src={images.avatar} alt="ntp"></Image>

                <strong>Nguyen Phong</strong>

                <div className={cx('container__tutors-icons')}>
                    <StarIcon className={cx('container__tutors-icons-item')} />
                    <StarIcon className={cx('container__tutors-icons-item')} />
                    <StarIcon className={cx('container__tutors-icons-item')} />
                    <StarIcon className={cx('container__tutors-icons-item')} />
                    <StarIcon className={cx('container__tutors-icons-item')} />
                </div>

                <span>$40/h</span>

                <p>
                    I am certified to teach k-12 Mathematics, Social Studies, and Spanish. Before that, I taught at
                    University of Maine Orono as a TA for two years.
                </p>
            </div>
        </div>
    );
}

export default ExcellentTutor;
