import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import Post from '~/components/Post';
import { ModalContext } from '~/components/ModalProvider';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import UpdateForm from './components/UpdateForm';

import styles from './MyPost.module.scss';

const cx = classNames.bind(styles);

const VIEW_FORM_LIST_URL = 'formfindtutor/student_getforms';
const VIEW_APLLY_LIST_URL = 'formfindtutor/student_get-applylist';
const BROWSE_TUTOR_URL = 'formfindtutor/student_browsertutor';
const DELETE_FORM_URL = 'formfindtutor/delete_form';
const NOTIFICATION_URL = 'notification/create_notification';

function MyPost() {
    const requestPrivate = useRequestsPrivate();
    // const { conn } = useContext(ModalContext);
    const [curPage, setcurPage] = useState(1);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 0,
        total: 1,
    });
    const [listResult, setListResult] = useState([]);
    const [listTutor, setListTutor] = useState([]);
    const [idForm, setIdForm] = useState('');
    const [status, setStatus] = useState(false);
    const [statusForm, setStatusForm] = useState();
    const [isActive, setIsActive] = useState();
    const [itemUpdate, setItemUpdate] = useState();
    const { updateForm, avatar, setUpdateForm } = useContext(ModalContext);
    const [showModal, setShowModal] = useState(false);
    const [syntax, setSyntax] = useState('');

    // const joinNotificationRoom = async (fullName, userID) => {
    //     console.log(fullName, userID);
    //     try {
    //         const conn = new HubConnectionBuilder()
    //             .withUrl('https://localhost:7262/chatHub')
    //             .configureLogging(LogLevel.Information)
    //             .build();

    //         conn.on('JoinSpecificNotification', (fullName, userID) => {
    //             console.log(fullName, userID);
    //         });

    //         conn.on('ReceiveNotification', (userID, noti) => {
    //             console.log('hi');
    //             setNotifications((noti) => [...noti, { noti }]);
    //             console.log(notifications, noti);
    //         });

    //         await conn.start();
    //         await conn.invoke('JoinSpecificNotification', { fullName, userID });

    //         setConnection(conn);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const sendNotification = async (receiverId) => {
    //     try {
    //         console.log(receiverId);
    //         await conn.invoke('SendNotification', receiverId);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const stopChatRoom = async () => {
    //     await conn.stop();
    //     setConnection('');
    // };

    //get list tutor
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        let url = VIEW_FORM_LIST_URL;
        if (statusForm || isActive || curPage) {
            const params = new URLSearchParams();
            if (statusForm !== undefined) {
                params.append('status', statusForm);
            }
            if (isActive !== undefined) {
                params.append('isActive', isActive);
            }
            if (curPage) {
                params.append('pageIndex', curPage);
            }
            url += `?${params.toString()}`;
        }

        const getAllMyPosts = async () => {
            const response = await requestPrivate.get(url, { signal: controller.signal });
            setStatus(false);
            setPagination({
                page: 1,
                limit: response.data.limitPage,
                total: 1,
            });
            isMounted && setListResult(response.data.listResult);
        };

        getAllMyPosts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [status, statusForm, isActive, curPage, requestPrivate]);

    //get list tutor apply to course
    const handleViewList = async (id) => {
        let isMounted = true;
        const controller = new AbortController();
        const response = await requestPrivate.get(`${VIEW_APLLY_LIST_URL}?formId=${id}`, {
            signal: controller.signal,
        });
        setIdForm(id);
        isMounted && setListTutor(response.data);

        return () => {
            isMounted = false;
            controller.abort();
        };
    };

    //Browse tutor by student
    const handleBrowseTutor = async (formId, tutorId) => {
        try {
            const response = await requestPrivate.put(
                `${BROWSE_TUTOR_URL}?action=${true}&formId=${formId}&tutorId=${tutorId}`,
            );
            if (response.status === 200) {
                setStatus(true);
                createNotification(tutorId, formId);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //create notification
    const createNotification = async (tutorId, formId) => {
        try {
            const response = await requestPrivate.post(
                NOTIFICATION_URL,
                JSON.stringify({
                    title: 'has been choose you become their tutor',
                    description: `create class to connect with ${avatar.fullName}`,
                    url: `/generateClass/${formId}`,
                    accountId: tutorId,
                }),
            );
            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete form
    const handleDeleteForm = async (formId) => {
        try {
            const response = await requestPrivate.delete(`${DELETE_FORM_URL}?id=${formId}`);
            if (response.status === 200) {
                setStatus(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //filter form
    const handleForm = (value) => {
        console.log(value);
        if (value === 'Not yet approved') {
            setStatusForm();
            setIsActive();
        } else if (value === 'Has been approved') {
            setStatusForm(true);
            setIsActive();
        } else if (value === 'Not approved') {
            setStatusForm(false);
            setIsActive();
            setSyntax('Not approved');
        } else {
            setStatusForm(true);
            setIsActive(true);
            setSyntax('Approved tutor');
        }
    };
    //update form
    const handleUpdateForm = (item) => {
        setUpdateForm(true);
        setItemUpdate(item);
    };

    return (
        <div className={cx('wrapper')}>
            <Post
                pagination={pagination}
                curPage={curPage}
                setcurPage={setcurPage}
                listClasses={listResult}
                handleViewList={handleViewList}
                listTutor={listTutor}
                idForm={idForm}
                handleBrowseTutor={handleBrowseTutor}
                handleDeleteForm={handleDeleteForm}
                handleForm={handleForm}
                handleUpdateForm={handleUpdateForm}
                syntax={syntax}
            ></Post>
            {updateForm && <UpdateForm formId={idForm} item={itemUpdate} />}

            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your had connected this tutor successfully. Please wait for tutor response!</Modal.Body>
            </Modal>
        </div>
    );
}

export default MyPost;
