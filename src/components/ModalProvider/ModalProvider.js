import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [user, setUser] = useState(false);
    const [active, setActive] = useState(false);
    const [auth, setAuth] = useState({});
    const [userId, setUserId] = useState('');
    const [activeSignUp, setActiveSignUp] = useState(false);

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
        userId,
        setUserId,
        activeSignUp,
        handleUser,
        handleHiddenUser,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
