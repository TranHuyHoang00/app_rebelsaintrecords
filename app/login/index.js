import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
const logo = require("../../assets/images/logo.png");
const bg = require("../../assets/images/bg.png");
import { get_list_user } from "../../services/api";
import { useRouter } from "expo-router";
const Login = () => {
    const router = useRouter();
    const isCarousel = React.useRef(null);
    const SLIDER_WIDTH = Dimensions.get("window").width;
    const [Artists, setArtists] = useState([]);
    const [Managers, setManager] = useState([]);

    useEffect(() => {
        handle_get_list_user();
    }, []);

    const handle_get_list_user = async () => {
        try {
            const data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_artist = data_raw.filter(
                    (obj) => obj.role.name == "Artist"
                );
                let data_manager = data_raw.filter(
                    (obj) => obj.role.name == "Manager"
                );
                setArtists(data_artist);
                setManager(data_manager);
            }
        } catch (error) {
            console.error("Error in :", error);
        }
    };
    const CarouselCardItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => on_click_screen(item.id)}>
                <View style={styles.carousel} key={item && item.id}>
                    <Image source={{ uri: item && item.avatar }} style={styles.image} />
                    <View style={styles.carousel_fullname}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.fullname}
                        >
                            {item && item.fullname}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const on_click_screen = (id) => {
        router.push({ pathname: `modal_login`, params: { id: id } });
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.bg}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.main}>
                    <View style={styles.main_banner1}>
                        <Text style={styles.text_banner1}>
                            WELCOME TO THE HOUSE OF REBELLIOUS DREAMERS
                        </Text>
                    </View>
                    <View style={styles.main_banner2}>
                        <Text style={styles.text_banner2}>WHO ARE YOU ?</Text>
                    </View>
                    <View style={styles.main_carousel}>
                        <Carousel
                            layout="default"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            data={Artists}
                            renderItem={CarouselCardItem}
                            sliderWidth={SLIDER_WIDTH - (SLIDER_WIDTH - 310)}
                            itemWidth={150}
                            itemHeight={150}
                            inactiveSlideShift={0}
                            useScrollView={true}
                            activeSlideAlignment={"start"}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                        />
                    </View>
                    <View style={styles.main_carousel}>
                        <Carousel
                            layout="default"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            data={Managers}
                            renderItem={CarouselCardItem}
                            sliderWidth={150}
                            itemWidth={150}
                            itemHeight={150}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.text_footer1}>wwww.rebelsaintrecords.com</Text>
                    </View>
                    <View style={styles.banner_text_footer2}>
                        <Text style={styles.text_footer2}>
                            2022 © rebelsaintrecords | registered in Vietnam VAT number
                            0317147107 | RebelSaint Entertainment & Media Company Limited |
                            RSR Co., Ltd
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Login
const styles = StyleSheet.create({
    carousel: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 2,
        resizeMode: 'cover',
    },
    carousel_fullname: {
        overflow: "hidden",
        marginHorizontal: 10,
    },
    fullname: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 10,
    },
    bg: {
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        height: "100%",
        flexDirection: "column",
    },
    main: {
        flex: 1,
    },
    main_banner1: {
        backgroundColor: "#d40404",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text_banner1: {
        textAlign: 'center',
        padding: 5,
        color: "white",
        fontWeight: "700",
        fontSize: 12,
    },
    main_banner2: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text_banner2: {
        padding: 10,
        color: "#ffde59",
        fontWeight: "700",
        fontSize: 18,
    },
    main_carousel: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 10,
    },
    header: {
        paddingHorizontal: 10,
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 100,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
    },
    text_footer1: {
        padding: 10,
        color: "white",
        fontWeight: "500",
    },
    banner_text_footer2: {
        width: "100%",
        backgroundColor: "#f8cf2c",
    },
    text_footer2: {
        padding: 4,
        textAlign: "center",
        color: "black",
        fontSize: 5,
    },
});