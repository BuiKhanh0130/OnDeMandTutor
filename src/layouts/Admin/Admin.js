import classNames from 'classnames/bind';

import HeaderAdmin from './components/HeaderAdmin';
import Sidebar from '../Admin/components/Sidebar';
import Main from './components/Sidebar/Main';

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

function Admin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <Sidebar />
            <Main />
        </>
    );
}

export default Admin;
