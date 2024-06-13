import classNames from 'classnames/bind';
import HeaderTutor from './components/HeaderTutor/HeaderTutor'

import styles from './Tutor.module.scss'

const cx = classNames.bind(styles);

function Tutor({children}){
    return (
        <div>
            <HeaderTutor/>
            {children}
        </div>
    )
}

export default Tutor;