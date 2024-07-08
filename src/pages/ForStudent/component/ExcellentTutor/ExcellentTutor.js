import classNames from 'classnames/bind';

import images from '~/assets/images';
import Image from '~/components/Image';
import { StarIcon } from '~/components/Icons';

import styles from './ExcellentTutor.module.scss';

const cx = classNames.bind(styles);

function ExcellentTutor({ fullName, headline, subject, hour }) {
    return (
        <div className={cx('slide')}>
            <div className={cx('container__tutors-card')}>
                <Image src={images.avatar} alt="ntp"></Image>

                <strong>{fullName}</strong>

                <div className={cx('container__tutors-icons')}>{subject.join('/')}</div>

                <span>{hour} hour</span>

                <p>{headline}</p>
            </div>
        </div>
    );
}

export default ExcellentTutor;
