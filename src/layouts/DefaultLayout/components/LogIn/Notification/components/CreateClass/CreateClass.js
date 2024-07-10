import classNames from 'classnames/bind';

import styles from './CreateClass.module.scss';
import { useContext, useState } from 'react';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';
import { CloseIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function CreateClass() {
    const { generateClass, setGenerateClass } = useContext(ModalContext);
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('tutor__subject')}>
                        <label id="className">Name class</label>
                        <input type="text" id="className"></input>
                    </div>
                    <div className={cx('tutor__grade')}>
                        <textarea type="text" id="description" placeholder="Description"></textarea>
                    </div>
                    <Button className={cx('submit')}>Submit</Button>
                </div>
                <div className={cx('closeIcon')}>
                    <CloseIcon />
                </div>
            </div>
        </div>
    );
}

export default CreateClass;
