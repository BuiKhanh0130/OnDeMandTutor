import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Successful.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Successfully() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const goBack = () => navigate(-1);
    console.log(state);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img src={images.backgroundSuccess} alt="backgound"></img>
                <div>
                    <h1 className={cx('title')}>{`${state} SUCCESSFULLY`}</h1>
                    <div onClick={goBack}>
                        <Button orange className={cx('goback')}>
                            BACK TO {state} PAGE
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Successfully;
