import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);

    const handleActive = () => {
        setActive(true);
    };

    const handleHiddenActive = () => {
        setActive(false);
    };

    const handleActiveSignUp = () => {
        setActiveSignUp(true);
    };

    const handleHiddenActiveSignUp = () => {
        setActiveSignUp(false);
    };

    const value = {
        active,
        activeSignUp,
        handleActive,
        handleHiddenActive,
        handleActiveSignUp,
        handleHiddenActiveSignUp,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
