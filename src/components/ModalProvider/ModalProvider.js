import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [user, setUser] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [sendEmail, setSendEmail] = useState(false);
    const [listTutor, setListTutor] = useState(false);
    const [avatarMessage, setAvatarMessage] = useState({});
    const [active, setActive] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [auth, setAuth] = useState({});
    const [userId, setUserId] = useState('');
    const [tutorId, setTutorId] = useState('');
    const [conn, setConnection] = useState();
    const [messages, setMessage] = useState([]);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [createClass, setCreateClass] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [chooseSubject, setChooseSubject] = useState(false);

    const handleActive = () => {
        setActive(true);
    };

    const handleHiddenActive = () => {
        setActive(false);
        setActiveSignUp(false);
    };

    const handleActiveSignUp = () => {
        setActiveSignUp(true);
    };

    const handleUser = () => {
        setUser(true);
    };

    const handleHiddenUser = () => {
        setUser(false);
    };

    const value = {
        user,
        active,
        auth,
        chooseSubject,
        setAuth,
        setActive,
        tutorId,
        avatar,
        setAvatar,
        avatarMessage,
        setAvatarMessage,
        userId,
        setUserId,
        activeSignUp,
        roomId,
        setRoomId,
        conn,
        listTutor,
        setListTutor,
        sendEmail,
        setSendEmail,
        setConnection,
        messages,
        setMessage,
        createClass,
        setCreateClass,
        updateForm,
        setUpdateForm,
        setChooseSubject,
        handleUser,
        setTutorId,
        handleHiddenUser,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
