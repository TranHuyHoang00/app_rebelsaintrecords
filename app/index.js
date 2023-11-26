import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import Storages from '../auths/Storages';
const index = () => {
    const [User, setUser] = useState(null);
    useEffect(() => {
        load_data_account();
    }, []);
    const load_data_account = async () => {
        const data = await Storages.getData('account');
        if (data == null) {
            setUser(null);
        } else {
            setUser(data);
        }
    }
    return (
        <>
            <View>
                {User == null ?
                    <Redirect href="/login" />
                    :
                    <Redirect href="/home" />
                }
            </View>
        </>
    )
}
export default index

const styles = StyleSheet.create({

})