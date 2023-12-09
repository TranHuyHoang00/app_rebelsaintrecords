import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'expo-router';
import { get_local } from '../auths/local_storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
const index = () => {
    const [account, setAccount] = useState();
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        handle_get_account();
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const handle_get_account = async () => {
        try {
            const data = await get_local(process.env.EXPO_PUBLIC_ACCOUNT);
            if (data == null) {
                setAccount(false);
            } else {
                setAccount(true);
            }
        } catch (e) {
            console.log('Error');
        }
    }
    return (
        <>
            {account == false &&
                <Redirect href="/login" />}
            {account == true &&
                <Redirect href="/calender" />}
        </>
    )
}
export default index

