import React, { useEffect, useState } from 'react';
import styles from './MainDash.module.scss';
import classNames from 'classnames/bind';
import Table from '../Table';

import requests from '~/utils/request';

const cx = classNames.bind(styles);

const ALL_FORM_CREATE_CLASS_URL = 'FormFindTutor/moderator/viewformlist';

const MainDash = () => {
    const [formCreateClass, setFormCreateClass] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFormCreateClass = async () => {
            const response = await requests.get(ALL_FORM_CREATE_CLASS_URL, {
                signal: controller.signal,
            });
            console.log(response.data);
            isMounted && setFormCreateClass(response.data);
        };

        getFormCreateClass();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
    return (
        <div className={cx('MainDash')}>
            <h1>Dashboard</h1>
            <Table form={formCreateClass} />
        </div>
    );
};

export default MainDash;
