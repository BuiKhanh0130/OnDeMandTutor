import classNames from 'classnames/bind';

import ModalLoading from '~/components/ModalLoading';

import styles from './UpdateUrl.module.scss';
import { CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function UpdateUrl({ onHide, contentUrl, handleUpdateClassUrl, handleChangeNewUrl }) {
    return (
        <ModalLoading>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <input type="text" placeholder="URL" value={contentUrl} onChange={handleChangeNewUrl}></input>
                </div>
                <Button orange onClick={handleUpdateClassUrl} className={cx('btn-send')}>
                    Send
                </Button>
                <div onClick={onHide}>
                    <CloseIcon className={cx('close-icon')} />
                </div>
            </div>
        </ModalLoading>
    );
}

export default UpdateUrl;
