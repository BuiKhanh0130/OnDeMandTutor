import classNames from 'classnames/bind';

import Image from '~/components/Image';

import styles from './UniversityPanel.module.scss';

const cx = classNames.bind(styles);

function UniversityPanel({ universities }) {
    return (
        <div className={cx('UniversityPanel')}>
            {universities.map((universityChildren, index) => {
                return (
                    <div key={index} className={cx('UniversityPanel-container')}>
                        <div className={cx('UniversityPanel-title')}>{universityChildren.title}</div>
                        <div className={cx('UniversityPanel-items')}>
                            {universityChildren.images.map((image, index) => {
                                return <Image key={index} src={image} alt="#"></Image>;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UniversityPanel;
