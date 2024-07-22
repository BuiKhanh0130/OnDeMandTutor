import { useContext } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { ModalContext } from '~/components/ModalProvider';

export const useNoti = (fullName, userID) => {
    const { notifications, setConnection, setNotifications } = useContext(ModalContext);
    const joinNotificationRoom = async (fullName, userID) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl('https://localhost:7262/chatHub')
                .configureLogging(LogLevel.Information)
                .build();

            conn.on('JoinSpecificNotification', (fullName, userID) => {
                console.log(fullName, userID);
            });

            conn.on('ReceiveNotification', (userID, msg) => {
                console.log('hi');
                setNotifications((noti) => [...noti, { noti }]);
                console.log(notifications, msg);
            });

            await conn.start();
            await conn.invoke('JoinSpecificNotification', { fullName, userID });

            setConnection(conn);
            return conn;
        } catch (e) {
            console.log(e);
        }
    };
};
