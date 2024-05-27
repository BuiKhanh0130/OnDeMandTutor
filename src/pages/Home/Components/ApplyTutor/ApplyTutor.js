import classNames from 'classnames/bind';

import Button from '~/component/Button';

import styles from './ApplyTutor.module.scss';

const cx = classNames.bind(styles);

function ApplyTutor({ applyTutor }) {
    return (
        <div className={cx('ApplyTutor')}>
            {applyTutor.map((apply) => {
                return (
                    <div className={cx('ApplyTutor-container')}>
                        <div className={cx('ApplyTutor-title')}>{apply.title}</div>
                        <div className={cx('ApplyTutor-summary')}>{apply.summary}</div>
                        <Button transparent className={cx('ApplyTutor-btn')}>
                            {apply.button}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}

export default ApplyTutor;
