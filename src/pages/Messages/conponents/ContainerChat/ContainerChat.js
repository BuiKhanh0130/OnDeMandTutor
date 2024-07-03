import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import images from '~/assets/images';
import useRequestsPrivate from '~/hooks/useRequestPrivate';
import { ModalContext } from '~/components/ModalProvider';
import MessageContainer from './MessageContainer';
import { SendIcon } from '~/components/Icons';

import styles from './ContainerChat.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MESSAGES_URL = 'Message';

function ContainerChat({ sendMessage }) {
    const { messages, chat, roomId, setCreateClass } = useContext(ModalContext);
    const axiosPrivate = useRequestsPrivate();
    const [allMsgs, setAllMsgs] = useState([]);
    const [content, setContent] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAllMsg = async () => {
            try {
                const response = await axiosPrivate.get(`${MESSAGES_URL}/${roomId}`, {
                    signal: controller.signal,
                });
                isMounted && setAllMsgs(response?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllMsg();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [roomId, axiosPrivate]);

    const handleSubmit = async () => {
        try {
            const response = await axiosPrivate.post(MESSAGES_URL, { roomId, content });
            setContent('');
            sendMessage(response.data.messageId);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Col lg="8" className={cx('container__mess_detail')}>
            <Row>
                <Col lg="12" className={cx('container__mess_header')}>
                    <img alt={chat?.name} src={chat?.avatar}></img>
                    <span>{chat?.name}</span>
                </Col>
            </Row>
            <Row className={cx('container__mess-body')}>
                <MessageContainer allMsgs={allMsgs} />
                <MessageContainer messages={messages} />
            </Row>
            <Row>
                <Col lg="12" className={cx('container__type-message')}>
                    <input
                        type="text"
                        className={cx('type_message')}
                        ref={inputRef}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <SendIcon onClick={handleSubmit} />
                    <Button
                        transparent
                        className={cx('container__type-message-btn')}
                        onClick={() => {
                            setCreateClass(true);
                        }}
                    >
                        Create class
                    </Button>
                </Col>
            </Row>
        </Col>
    );
}

export default ContainerChat;
