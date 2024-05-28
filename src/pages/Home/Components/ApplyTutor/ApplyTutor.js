import classNames from 'classnames/bind';

import Button from '~/components/Button';

import styles from './ApplyTutor.module.scss';

const cx = classNames.bind(styles);

function ApplyTutor({ applyTutor }) {
    return (
        <div className={cx('ApplyTutor')}>
            <div className={cx('ApplyTutor-container')}>
                {applyTutor.map((apply, index) => {
                    return (
                        <div key={index} className={cx('ApplyTutor-content')}>
                            <div className={cx('ApplyTutor-title')}>{apply.title}</div>
                            <div className={cx('ApplyTutor-summary')}>{apply.summary}</div>
                            <Button transparent className={cx('ApplyTutor-btn')}>
                                {apply.button}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ApplyTutor;
