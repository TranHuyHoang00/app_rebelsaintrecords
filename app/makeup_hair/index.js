import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
import { get_makeup_hair } from '../../services/api';
import { AntDesign, Fontisto, FontAwesome, } from '@expo/vector-icons';
const bg = require("../../assets/images/bg.png");
import Carousel from "react-native-snap-carousel";
const makeup_hair = () => {
    const router = useRouter();
    const isCarousel = React.useRef(null);
    const { id } = useLocalSearchParams();
    const [Makeup_hair, setMakeup_hair] = useState({});
    useEffect(() => {
        if (id && id !== null && id !== undefined) {
            handle_get_makeup_hair(id);
        }
    }, []);
    const handle_get_makeup_hair = async (id) => {
        try {
            const data = await get_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                setMakeup_hair(data_raw);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const CarouselCardItem = ({ item }) => {
        return (
            <View style={styles.carousel} key={item && item.id}>
                <Image source={{ uri: item && item.value }} style={styles.image} />
            </View>
        );
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
                        <FontAwesome name="paint-brush" size={22} color="black" />
                        <Text style={styles.text_span}>MAKE UP - HAIR</Text>
                        <Fontisto name="person" size={22} color="black" />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.main_info}>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Make up :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Makeup_hair && Makeup_hair.make_up}</Text>
                                </View>
                            </View>
                            <View style={styles.main_info1}>
                                <Text style={styles.text_lable}>- Make hair :</Text>
                                <View style={styles.info}>
                                    <Text style={styles.text_info}>{Makeup_hair && Makeup_hair.make_hair}</Text>
                                </View>
                            </View>
                            <View style={styles.main_carousel}>
                                <Carousel
                                    layout="default"
                                    layoutCardOffset={9}
                                    ref={isCarousel}
                                    data={Makeup_hair && Makeup_hair.images}
                                    renderItem={CarouselCardItem}
                                    sliderWidth={310}
                                    itemWidth={300}
                                    itemHeight={300}
                                    inactiveSlideShift={0}
                                    useScrollView={true}
                                // activeSlideAlignment={"start"}
                                // inactiveSlideScale={1}
                                // inactiveSlideOpacity={1}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer />
            </ImageBackground>
        </View>
    )
}

export default makeup_hair

const styles = StyleSheet.create({
    image: {
        height: 280,
        width: 280,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 2,
        resizeMode: 'cover',
    },
    carousel: {
        justifyContent: "center",
        alignItems: "center",
    },
    main_carousel: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 10,
    },
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