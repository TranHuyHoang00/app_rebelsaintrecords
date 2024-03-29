import { StyleSheet, Text, View, Pressable, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
const bg = require("../../assets/images/bg.png");
import { get_schedule } from '../../services/api';
import { handle_phone_press } from '../../auths/phone_press';
import { AntDesign, Entypo, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons, Foundation, FontAwesome5 } from '@expo/vector-icons';
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
        if (time && time !== undefined) {
            var timeParts = time.split(":");
            var formattedTime = timeParts[0] + ":" + timeParts[1];
            return formattedTime
        }

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
                                <View style={styles.main_span}>
                                    <View style={styles.span} >
                                        <Entypo name="back-in-time" size={22} color="black" />
                                        <Text style={styles.text_span}>TIME - LOCATION</Text>
                                        <AntDesign name="enviromento" size={22} color="black" />
                                    </View>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>{format_time(Schedule.time_localtion_id && Schedule.time_localtion_id.show_time)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.makeup_hair_id && Schedule.makeup_hair_id.id, 'makeup_hair')}>
                                <View style={styles.main_span}>
                                    <View style={styles.span}>
                                        <FontAwesome name="paint-brush" size={22} color="black" />
                                        <Text style={styles.text_span}>MAKE UP - HAIR</Text>
                                        <Fontisto name="person" size={22} color="black" />
                                    </View>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>Make up: {Schedule.makeup_hair_id && Schedule.makeup_hair_id.make_up}</Text>
                                    </View>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>Make hair: {Schedule.makeup_hair_id && Schedule.makeup_hair_id.make_hair}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.stylist_id && Schedule.stylist_id.id, 'stylist')}>
                                <View style={styles.main_span}>
                                    <View style={styles.span}>
                                        <Ionicons name="md-shirt-sharp" size={22} color="black" />
                                        <Text style={styles.text_span}>STYLIST </Text>
                                        <MaterialCommunityIcons name="tshirt-v-outline" size={22} color="black" />
                                    </View>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>{Schedule.stylist_id && Schedule.stylist_id.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.main_span}>
                                <TouchableOpacity onPress={() => on_click_screen(Schedule.charge_of_id && Schedule.charge_of_id.id, 'charge_of')}>
                                    <View style={styles.span}>
                                        <Entypo name="user" size={22} color="black" />
                                        <Text style={styles.text_span}>PERSON IN CHARGE </Text>
                                        <FontAwesome name="user-secret" size={22} color="black" />
                                    </View>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>{Schedule.charge_of_id && Schedule.charge_of_id.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handle_phone_press(Schedule.charge_of_id && Schedule.charge_of_id.phone)}>
                                    <View style={styles.span}>
                                        <Text style={styles.text_span1}>{Schedule.charge_of_id && Schedule.charge_of_id.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => on_click_screen(Schedule.charge_of_id && Schedule.charge_of_id.id, 'note')}>
                                <View style={styles.main_span}>
                                    <View style={styles.span}>
                                        <Foundation name="clipboard-notes" size={24} color="black" />
                                        <Text style={styles.text_span}>NOTE </Text>
                                        <FontAwesome5 name="sticky-note" size={22} color="black" />
                                    </View>
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
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 10,
    },
    text_span1: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#3d3d3d',
    },
    main_span: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginVertical: 5,
    },
    span: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 5,
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
        paddingVertical: 5,
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
