import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
import { get_charge_of } from '../../services/api';
import { AntDesign, FontAwesome5, Foundation } from '@expo/vector-icons';
const bg = require("../../assets/images/bg.png");
const charge_of = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [Charge_of, setCharge_of] = useState({});
    useEffect(() => {
        if (id && id !== null && id !== undefined) {
            handle_get_charge_of(id);
        }
    }, []);
    const handle_get_charge_of = async (id) => {
        try {
            const data = await get_charge_of(id);
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                setCharge_of(data_raw);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.bg}>
                <Header />
                <View style={styles.main}>
                    <View style={styles.container_menu}>
                        <Pressable style={styles.button} onPress={() => router.back()}>
                            <Text style={styles.button_text}>BACK</Text>
                            <AntDesign name="caretleft" size={16} color="#49688d" />
                        </Pressable>
                    </View>
                    <View style={styles.span}>
                        <Foundation name="clipboard-notes" size={24} color="black" />
                        <Text style={styles.text_span}>NOTE </Text>
                        <FontAwesome5 name="sticky-note" size={22} color="black" />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.main_info}>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Content :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Charge_of && Charge_of.note}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer />
            </ImageBackground>
        </View>
    )
}

export default charge_of

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
    },
    main_info1: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    main_info: {
        padding: 0,
    },
    info: {
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0',
        paddingVertical: 5,
    },
    text_lable: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    text_info: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    text_span: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    span: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    button_text: {
        color: "#49688d",
        fontSize: 14,
        fontWeight: "800",
        paddingRight: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        backgroundColor: "#ffde59",
    },
    container_menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    container: {
        height: "100%",
        flexDirection: "column",
    },
    bg: {
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
    },
    main: {
        flex: 1,
    },
})