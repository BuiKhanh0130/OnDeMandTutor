import classNames from 'classnames/bind';

import Form from '../Form';

import styles from './UpdateForm.module.scss';

const cx = classNames.bind(styles);

function UpdateForm({ item, formId }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <Form status={'update'} item={item} formId={formId} />
            </div>
        </div>
    );
}

export default UpdateForm;
