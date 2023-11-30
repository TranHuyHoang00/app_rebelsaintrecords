import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { get_local_account } from '../auths/local_storage';
const index = () => {
    const [account, setAccount] = useState();
    useEffect(() => {
        handle_get_account();
    }, []);

    const handle_get_account = async () => {
        try {
            const data = await get_local_account(process.env.EXPO_PUBLIC_ACCOUNT);
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