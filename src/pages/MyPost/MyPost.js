import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import Post from '~/components/Post';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './MyPost.module.scss';
import UpdateForm from './components/UpdateForm';

const cx = classNames.bind(styles);

const VIEW_FORM_LIST_URL = 'FormFindTutor/student/viewformlist';
const VIEW_APLLY_LIST_URL = 'FormFindTutor/student/viewApplyList';
const BROWSE_TUTOR_URL = 'FormFindTutor/student/browsertutor';
const DELETE_FORM_URL = 'FormFindTutor/student/deleteform';

function MyPost() {
    const requestPrivate = useRequestsPrivate();
    const [listResult, setListResult] = useState([]);
    const [listTutor, setListTutor] = useState([]);
    const [idForm, setIdForm] = useState('');
    const [status, setStatus] = useState(false);
    const [statusForm, setStatusForm] = useState();
    const [isActive, setIsActive] = useState();
    const [itemUpdate, setItemUpdate] = useState();
    const { updateForm, setUpdateForm } = useContext(ModalContext);

    console.log(statusForm, isActive);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        let url = VIEW_FORM_LIST_URL;
        if (statusForm || isActive) {
            const params = new URLSearchParams();
            if (statusForm) {
                params.append('status', statusForm);
            }
            if (isActive) {
                params.append('isActive', isActive);
            }
            url += `?${params.toString()}`;
        }
        const getAllMyPosts = async () => {
            const response = await requestPrivate.get(url, { signal: controller.signal });
            setStatus(false);
            isMounted && setListResult(response.data.listResult);
        };

        getAllMyPosts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status, statusForm, isActive]);

    const handleViewList = async (id) => {
        let isMounted = true;
        const controller = new AbortController();
        const response = await requestPrivate.get(`${VIEW_APLLY_LIST_URL}?formId=${id}`, { signal: controller.signal });
        setIdForm(id);
        isMounted && setListTutor(response.data);

        return () => {
            isMounted = false;
            controller.abort();
        };
    };

    const handleBrowseTutor = async (formId, tutorId) => {
        try {
            const response = await requestPrivate.put(`${BROWSE_TUTOR_URL}?formId=${formId}&tutorId=${tutorId}`);
            if (response.status === 200) {
                window.alert('Apply successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteForm = async (formId) => {
        try {
            const response = await requestPrivate.delete(`${DELETE_FORM_URL}?id=${formId}`);
            console.log(response.status);
            if (response.status === 200) {
                setStatus(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleForm = (value) => {
        console.log(value);
        if (value === 'Not yet approved') {
            setStatusForm();
            setIsActive();
        } else if (value === 'Has been approved') {
            setStatusForm(true);
            setIsActive();
        } else {
            setStatusForm(true);
            setIsActive(true);
        }
    };

    const handleUpdateForm = (item) => {
        setUpdateForm(true);
        setItemUpdate(item);
    };

    console.log(itemUpdate);

    return (
        <div className={cx('wrapper')}>
            <Post
                listClasses={listResult}
                handleViewList={handleViewList}
                listTutor={listTutor}
                idForm={idForm}
                handleBrowseTutor={handleBrowseTutor}
                handleDeleteForm={handleDeleteForm}
                handleForm={handleForm}
                handleUpdateForm={handleUpdateForm}
            ></Post>
            {updateForm && <UpdateForm formId={idForm} item={itemUpdate} />}
        </div>
    );
}

export default MyPost;
