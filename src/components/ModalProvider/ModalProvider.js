import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState(false);
    const [conn, setConnection] = useState();
    const [roomId, setRoomId] = useState('');
    const [avatar, setAvatar] = useState({});
    const [userId, setUserId] = useState('');
    const [messages, setMessage] = useState([]);
    const [active, setActive] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [listTutor, setListTutor] = useState(false);
    const [createClass, setCreateClass] = useState(false);
    const [avatarMessage, setAvatarMessage] = useState({});
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [complaint, setComplaint] = useState(false);

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
        setAuth,
        setActive,
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
        complaint,
        setComplaint,
        setMessage,
        createClass,
        setCreateClass,
        handleUser,
        handleHiddenUser,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
