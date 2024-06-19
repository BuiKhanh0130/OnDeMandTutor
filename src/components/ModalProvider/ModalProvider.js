import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [auth, setAuth] = useState({});
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

    const value = {
        active,
        auth,
        setAuth,
        activeSignUp,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
