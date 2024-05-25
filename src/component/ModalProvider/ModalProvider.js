import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(true);

    const handleActive = () => {
        setActive(true);
    };

    const handleHiddenActive = () => {
        setActive(false);
    };

    const value = {
        active,
        handleActive,
        handleHiddenActive,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
