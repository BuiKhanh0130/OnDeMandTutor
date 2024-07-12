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
    const [formId, setFormId] = useState('');
    const [auth, setAuth] = useState({});
    const [userId, setUserId] = useState('');
    const [tutorId, setTutorId] = useState('');
    const [conn, setConnection] = useState();
    const [messages, setMessage] = useState([]);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [createClass, setCreateClass] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [complaint, setComplaint] = useState(false);
    const [chooseSubject, setChooseSubject] = useState(false);
    const [generateClass, setGenerateClass] = useState(false);
    const [complaintModerator, setComplaintModerator] = useState(false);
    const [responseComplaint, setResponseComplaint] = useState(false);

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
        complaint,
        setComplaint,
        generateClass,
        setAvatar,
        avatarMessage,
        setAvatarMessage,
        userId,
        responseComplaint,
        setUserId,
        complaintModerator,
        setComplaintModerator,
        activeSignUp,
        roomId,
        formId,
        setRoomId,
        conn,
        listTutor,
        setListTutor,
        setResponseComplaint,
        sendEmail,
        setSendEmail,
        setConnection,
        messages,
        setMessage,
        setFormId,
        createClass,
        setCreateClass,
        updateForm,
        setUpdateForm,
        setChooseSubject,
        setGenerateClass,
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
