import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [user, setUser] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [active, setActive] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [auth, setAuth] = useState({});
    const [userId, setUserId] = useState('');
    const [conn, setConnection] = useState();
    const [messages, setMessage] = useState([]);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [createClass, setCreateClass] = useState(false);

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
        userId,
        setUserId,
        activeSignUp,
        roomId,
        setRoomId,
        conn,
        setConnection,
        messages,
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
