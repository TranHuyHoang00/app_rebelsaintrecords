import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TextInput,
    Pressable,
    Button,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
const logo = require("../../assets/images/logo.png");
const bg = require("../../assets/images/bg.png");
import { get_user, Login } from "../../services/api";
import { useRouter } from "expo-router";
import { set_local_account } from '../../auths/local_storage';
const modal_login = () => {
    const router = useRouter();
    const [User, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useLocalSearchParams();
    useEffect(() => {
        handle_get_user(id);
    }, []);
    const handle_get_user = async (id) => {
        try {
            const data = await get_user(id);
            if (data && data.data && data.data.success == 1) {
                const data_raw = data.data.data;
                setUser(data_raw);
                setUsername(data_raw.username);
            }
        } catch (error) {
            console.error("Error in component1:", error);
        }
    };
    const isCheckEmpty = (value) => {
        return value.trim().length
    }
    const isCheckSpace = (value) => {
        return (/\s/).test(value);
    }
    const Validation = (username, password) => {
        if (isCheckEmpty(username) == 0) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (isCheckEmpty(password) == 0) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        if (isCheckSpace(password) == true) {
            return { mess: "Password contains spaces", code: 1 };
        }
        return { code: 0 };
    }
    const handle_login = async () => {
        const result = Validation(username, password);
        if (result.code == 0) {
            try {
                let data = await Login(username, password);
                if (data && data.data && data.data.success == 1) {
                    const result = await set_local_account(process.env.EXPO_PUBLIC_ACCOUNT, data.data.data);
                    if (result == true) {
                        router.replace(`calender`);
                    }
                } else {
                    Alert.alert(`Usename or password is incorrect`);
                }
            } catch (e) {
                Alert.alert(`Usename or password is incorrect`);
            }
        } else {
            Alert.alert(result.mess);
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.bg}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.main}>
                    <View style={styles.main_banner}>
                        <Image source={{ uri: User && User.avatar }} style={styles.image} />
                    </View>
                    <View style={styles.main_banner}>
                        <Text style={styles.text_banner1}>ENTER YOUR IDENTITY CODE</Text>
                    </View>
                    <View style={styles.main_banner}>
                        <TextInput
                            style={styles.input}
                            placeholder="*******"
                            secureTextEntry={true}
                            placeholderTextColor="#ffde59"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.main_banner}>
                        <Pressable style={styles.button} onPress={handle_login} >
                            <Text style={styles.button_text}>LOGIN</Text>
                        </Pressable>
                    </View>
                    <View style={styles.main_banner}>
                        <Pressable onPress={() => router.back()}  >
                            <Text style={styles.button_text1}>BACK</Text>
                        </Pressable>
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
const styles = StyleSheet.create({
    image: {
        height: 130,
        width: 130,
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 2,
        resizeMode: 'cover',
    },
    button_text: {
        color: "#49688d",
        fontSize: 18,
        fontWeight: "600",
    },
    button_text1: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    button: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 100,
        backgroundColor: "#ffde59",
    },
    input: {
        width: "80%",
        borderColor: "white",
        borderBottomWidth: 2,
        textAlign: "center",
        height: 50,
        color: "#ffde59",
        fontSize: 18,
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
    main_banner: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text_banner1: {
        fontStyle: "italic",
        padding: 10,
        color: "white",
        fontWeight: "700",
        fontSize: 20,
    },
    header: {
        paddingHorizontal: 10,
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
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
export default modal_login