import classNames from 'classnames/bind';
import { useContext } from 'react';

import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';

import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup({ item }) {
    const formModal = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            {item &&
                item.map((register) => {
                    return (
                        <Button
                            key={register.id}
                            large
                            to={`/registration/${register.link}`}
                            state={[register.link, register.id]}
                            onClick={formModal.handleHiddenActive || formModal.handleHiddenActiveSignUp}
                        >
                            {register.btn}
                        </Button>
                    );
                })}
        </div>
    );
}

export default Signup;
