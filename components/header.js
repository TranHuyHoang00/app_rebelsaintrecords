import { StyleSheet, View, Pressable, Text } from 'react-native'
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
            <Pressable onPress={handleLogout}  >
                <Text style={styles.button_text1}>Logout</Text>
            </Pressable>

        </View>
    )
}

export default header

const styles = StyleSheet.create({
    button_text1: {
        color: "#ffde59",
        fontSize: 18,
        fontWeight: "400",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 20,
    },
})