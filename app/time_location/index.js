import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
import { get_time_location } from '../../services/api';
import { AntDesign, Entypo, } from '@expo/vector-icons';
const bg = require("../../assets/images/bg.png");
const time_location = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [Time_location, setTime_location] = useState({});
    useEffect(() => {
        if (id && id !== null && id !== undefined) {
            handle_get_time_location(id);
        }
    }, []);
    const handle_get_time_location = async (id) => {
        try {
            const data = await get_time_location(id);
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                setTime_location(data_raw);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const format_time = (time) => {
        var time_raw = new Date(time);
        var hour = time_raw.getHours();
        var minute = time_raw.getMinutes();
        if (hour.toString().length === 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length === 1) {
            minute = '0' + minute;
        }
        return `${hour}:${minute}`
    }
    const handlePhonePress = (phone) => {
        const phoneUrl = `tel://${phone}`;
        if (phone == undefined) {
            return;
        } else {
            Linking.canOpenURL(phoneUrl)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(phoneUrl);
                    }
                })
                .catch((error) => console.error('Lỗi:', error));
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
                    <View style={styles.span} >
                        <Entypo name="back-in-time" size={22} color="black" />
                        <Text style={styles.text_span}>TIME - LOCATION</Text>
                        <AntDesign name="enviromento" size={22} color="black" />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.main_info}>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Show date :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Time_location && Time_location.show_date}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Show time :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{format_time(Time_location && Time_location.show_time)}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Leave time :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{format_time(Time_location && Time_location.leave_time)}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Makeup time :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{format_time(Time_location && Time_location.make_up_time)}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Show location :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Time_location && Time_location.show_localtion}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Agency name :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Time_location && Time_location.agency_name}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Contact :</Text>
                                <TouchableOpacity onPress={() => handlePhonePress(Time_location && Time_location.contact)}>
                                    <View style={styles.info}>
                                        <Text style={styles.text_info}>{Time_location && Time_location.contact}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer />
            </ImageBackground>
        </View>
    )
}

export default time_location

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
        textAlign: 'center'
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