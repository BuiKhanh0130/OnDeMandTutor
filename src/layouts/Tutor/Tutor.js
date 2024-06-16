import classNames from 'classnames/bind';
import HeaderTutor from './components/HeaderTutor/HeaderTutor'
import FooterTutor from './components/FooterTutor/FooterTutor'
import { ScrollToTop } from '~/components/ScrollToTop';

import styles from './Tutor.module.scss'

const cx = classNames.bind(styles);

function Tutor({children}){
    return (
        <div>
            <HeaderTutor/>
            {children}
            <ScrollToTop />
            <FooterTutor/>
        </div>
    )
}

export default Tutor;