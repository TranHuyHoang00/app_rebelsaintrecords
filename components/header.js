import { StyleSheet, Button, View, Image, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { remove_local_account, get_local_account } from '../auths/local_storage';
import { useRouter } from "expo-router";
const header = () => {
    const router = useRouter();
    const [account, setAccount] = useState();
    useEffect(() => {
        get_account();
    }, []);
    const handleLogout = async () => {
        const result = await remove_local_account(process.env.EXPO_PUBLIC_ACCOUNT);
        if (result == true) {
            router.push(`login`);
        }
    }
    const get_account = async () => {
        try {
            const data = await get_local_account(process.env.EXPO_PUBLIC_ACCOUNT);
            if (data == null) {
                setAccount({});
            } else {
                setAccount(data.user);
            }
        } catch (e) {
            console.log('Error');
        }
    }
    return (
        <View style={styles.header}>
            {/* <View style={styles.account}>
                <Image source={{ uri: account && account.avatar }} style={styles.image} />
                <Text style={styles.text_fullname}>{account && account.fullname}</Text>
            </View> */}
            <View>
                <Button title='LogOut' onPress={handleLogout} color='#ffde59' />
            </View>
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    text_fullname: {
        color: '#ffde59',
        fontWeight: '500',
        fontSize: 16,
        paddingLeft: 5,
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 2,
        resizeMode: 'cover',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
})