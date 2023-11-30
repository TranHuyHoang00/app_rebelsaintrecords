import { StyleSheet, Text, View, Pressable, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
const bg = require("../../assets/images/bg.png");
import { get_schedule } from '../../services/api';
import { AntDesign, Entypo, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const detail = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [Schedule, setSchedule] = useState([]);
    useEffect(() => {
        handle_get_schedule(id);
    }, []);
    const handle_get_schedule = async (id) => {
        try {
            const data = await get_schedule(id);
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                setSchedule(data_raw)
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
    const on_click_screen = (id, name) => {
        router.push({ pathname: `${name}`, params: { id } });
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
                        <View style={styles.container_menu}>
                            <Entypo name="clock" size={24} color="white" />
                            <Text style={styles.text_menu}> {format_time(Schedule.time_localtion_id && Schedule.time_localtion_id.show_time)}</Text>
                        </View>
                    </View>
                    <View style={styles.container_schedule}>
                        <View style={styles.header_schedule}>
                            <View style={styles.container_text}>
                                <Text style={styles.text_info}>Schedule Info</Text>
                                <Text style={styles.text_brand}>{Schedule.brand_id && Schedule.brand_id.name}</Text>
                            </View>
                            <View>
                                <Image style={styles.image} source={{ uri: Schedule.user_id && Schedule.user_id.avatar }} />
                            </View>
                        </View>
                        <View style={styles.container_span}>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.time_localtion_id && Schedule.time_localtion_id.id, 'time_location')}>
                                <View style={styles.span} >
                                    <Entypo name="back-in-time" size={22} color="black" />
                                    <Text style={styles.text_span}>TIME - LOCATION</Text>
                                    <AntDesign name="enviromento" size={22} color="black" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.makeup_hair_id && Schedule.makeup_hair_id.id, 'makeup_hair')}>
                                <View style={styles.span}>
                                    <FontAwesome name="paint-brush" size={22} color="black" />
                                    <Text style={styles.text_span}>MAKE UP - HAIR</Text>
                                    <Fontisto name="person" size={22} color="black" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.stylist_id && Schedule.stylist_id.id, 'stylist')}>
                                <View style={styles.span}>
                                    <Ionicons name="md-shirt-sharp" size={22} color="black" />
                                    <Text style={styles.text_span}>STYLIST </Text>
                                    <MaterialCommunityIcons name="tshirt-v-outline" size={22} color="black" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.charge_of_id && Schedule.charge_of_id.id, 'charge_of')}>
                                <View style={styles.span}>
                                    <Entypo name="user" size={22} color="black" />
                                    <Text style={styles.text_span}>PERSON IN CHARGE </Text>
                                    <FontAwesome name="user-secret" size={22} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Footer />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    text_menu: {
        color: '#ffde59',
        fontSize: 18,
        fontWeight: '500',
    },
    container_span: {
        paddingHorizontal: 30,
        paddingVertical: 10,
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
        marginVertical: 5,
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 2,
        resizeMode: 'cover',
    },
    header_schedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "white",
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
    },
    container_text: {
        textAlign: 'center',
    },
    text_info: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: 'center',
        color: 'white',
    },
    text_brand: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "500",
        color: '#ebe6e6',
    },
    container_schedule: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
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
export default detail
