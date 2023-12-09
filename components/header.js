import { StyleSheet, View, Pressable, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { remove_local, get_local } from '../auths/local_storage';
import { useRouter } from "expo-router";
import { get_list_device, delete_device } from '../services/api';
const header = () => {
    const router = useRouter();
    useEffect(() => {
    }, []);

    const handle_delete_device = async (id) => {
        try {
            let data = await delete_device(id);
            if (data && data.data && data.data.success == 1) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleLogout = async () => {
        const device_id = await get_local('device_id');
        if (device_id !== null) {
            let result_delete = await handle_delete_device(device_id);
            if (result_delete == true) {
                const result_remove_account = await remove_local(process.env.EXPO_PUBLIC_ACCOUNT);
                if (result_remove_account == true) {
                    const result_remove_device_id = await remove_local('device_id');
                    if (result_remove_device_id == true) {
                        router.push(`login`);
                    }
                }
            }
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