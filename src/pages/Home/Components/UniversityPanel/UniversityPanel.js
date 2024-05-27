import classNames from 'classnames/bind';

import Image from '~/component/Image';

import styles from './UniversityPanel.module.scss';

const cx = classNames.bind(styles);

function UniversityPanel({ universities }) {
    return (
        <div className={cx('UniversityPanel')}>
            {universities.map((universityChildren) => {
                return (
                    <div className={cx('UniversityPanel-container')}>
                        <div className={cx('UniversityPanel-title')}>{universityChildren.title}</div>
                        <div className={cx('UniversityPanel-items')}>
                            {universityChildren.images.map((image) => {
                                return <Image src={image} alt="#"></Image>;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UniversityPanel;
