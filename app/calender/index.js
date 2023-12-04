import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from "expo-router";
const bg = require("../../assets/images/bg.png");
import Footer from '../../components/footer';
import Header from '../../components/header';
import { Calendar } from 'react-native-big-calendar';
import { get_list_schedule, get_list_user } from '../../services/api';
import { get_local_account } from '../../auths/local_storage';
import dayjs from "dayjs";
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
const calender = () => {
    const router = useRouter();
    const [Schedules, setSchedules] = useState([]);
    const [Filter_type, setFilter_type] = useState({});
    const [date, setDate] = React.useState(dayjs());
    const [Month_now, setMonth_now] = useState({});
    const [Year_now, setYear_now] = useState('');
    const data_month = [
        { id: '1', name: 'January' },
        { id: '2', name: 'February' },
        { id: '3', name: 'March' },
        { id: '4', name: 'April' },
        { id: '5', name: 'May' },
        { id: '6', name: 'June' },
        { id: '7', name: 'July' },
        { id: '8', name: 'August' },
        { id: '9', name: 'September' },
        { id: '10', name: 'October' },
        { id: '11', name: 'November' },
        { id: '12', name: 'December' },
    ]
    const [Open_drop, setOpen_drop] = useState(false);
    const [Value_drop, setValue_drop] = useState(0);
    const [Users, setUsers] = useState([]);
    const [Is_user, setIs_user] = useState('');
    useEffect(() => {
        get_account();
        get_month_now(new Date());
    }, []);
    const handle_get_list_user = async () => {
        try {
            const data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_artist = data_raw.filter(
                    (obj) => obj.role.name == "Artist"
                );
                let Users = [{ label: 'All Artist', value: 0 }];
                for (const i of data_artist) {
                    let obj = {};
                    obj.label = i.fullname;
                    obj.value = i.id;
                    Users.push(obj);
                }
                setUsers(Users);
            }
        } catch (error) {
            console.error("Error in component:", error);
        }
    };
    const get_account = async () => {
        try {
            const data = await get_local_account(process.env.EXPO_PUBLIC_ACCOUNT);
            if (data !== null) {
                if (data.user && data.user.id) {
                    let obj = {};
                    if (data.user.role && data.user.role.name == 'Manager') {
                        obj = {
                            user_id: 0,
                            date: format_date(new Date(), 1),
                            type_date: 1,
                        }
                        setIs_user(true);
                        handle_get_list_user();
                    } else {
                        obj = {
                            user_id: data.user && data.user.id,
                            date: format_date(new Date(), 1),
                            type_date: 1,
                        }
                        setIs_user(false);
                    }
                    handle_get_list_schedule(obj);
                    setFilter_type(obj);
                }

            }
        } catch (e) {
            console.log('Error');
        }
    }
    const handle_get_list_schedule = async (value) => {
        try {
            const data = await get_list_schedule(value);
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let arr = [];
                for (const item of data_raw) {
                    const date = format_date(item.time_localtion_id && item.time_localtion_id.show_date, 2);
                    const obj = {
                        title: item.user_id && item.user_id.fullname,
                        start: new Date(date),
                        end: new Date(date),
                    }
                    arr.push(obj);
                }
                setSchedules(arr);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const format_date = (value, type) => {
        if (type == 1) {
            return moment(new Date(value)).format('DD-MM-YYYY')
        }
        if (type == 2) {
            return moment(new Date(value)).format('YYYY-MM-DD')
        }
        if (type == 3) {
            return moment(new Date(value)).format('DD-MM-YYYY')
        }
    }
    const get_month_now = (value) => {
        const dateObject = new Date(value);
        const year = dateObject.getFullYear();
        setYear_now(year);
        const month = dateObject.getMonth() + 1;
        for (const i of data_month) {
            if (i.id == month) {
                setMonth_now(i);
            }
        }
    }
    const on_click_date = (value) => {
        let date = format_date(value, 3);
        router.push({ pathname: `schedule`, params: { user_id: Filter_type.user_id, date: date, type_date: 2 } });
    }
    const onPrev = () => {
        setDate(date.add(-1, 'month'));
        get_month_now(date.add(-1, 'month'));
    }
    const onNext = () => {
        setDate(date.add(1, 'month'));
        get_month_now(date.add(1, 'month'));
    }
    const handle_onchange_drop = (value) => {
        let data = Filter_type;
        data.user_id = value;
        handle_get_list_schedule(data);
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.bg}>
                <Header />
                <View style={styles.main}>
                    <View style={styles.main_control}>
                        {Is_user == true &&
                            <View style={styles.control1}>
                                <DropDownPicker
                                    open={Open_drop}
                                    value={Value_drop}
                                    items={Users}
                                    setOpen={setOpen_drop}
                                    setValue={setValue_drop}
                                    onChangeValue={handle_onchange_drop}
                                    containerStyle={{ width: 130 }}
                                    style={styles.DropDownPicker}
                                    dropDownContainerStyle={{
                                        backgroundColor: "white"
                                    }}
                                    ArrowDownIconComponent={({ style }) => (
                                        <AntDesign name="filter" size={20} color="black" />
                                    )}
                                />
                            </View>
                        }
                        <View style={styles.control}>
                            <Pressable style={styles.button1} onPress={onPrev}>
                                <AntDesign name="left" size={24} color="#d60202" />
                            </Pressable>
                            <View>
                                <Text style={styles.text_month}>{Month_now && Month_now.name}</Text>
                                <Text style={styles.text_year}>{Year_now}</Text>
                            </View>
                            <Pressable style={styles.button2} onPress={onNext}>
                                <AntDesign name="right" size={24} color="#d60202" />
                            </Pressable>
                        </View>

                    </View>
                    <Calendar
                        date={date.toDate()}
                        height={600}
                        events={Schedules}
                        mode={'month'}
                        onPressCell={(value) => on_click_date(value)}
                        calendarCellTextStyle={{ color: 'white' }}
                        swipeEnabled={false}
                        calendarCellStyle={{
                            //backgroundColor: '#4d4d4d',
                        }}
                        headerContainerStyle={{
                            color: 'white'
                        }}
                    />
                </View>
                <Footer />
            </ImageBackground>
        </View>
    )
}

export default calender

const styles = StyleSheet.create({
    DropDownPicker: {
        backgroundColor: '#ffde59',
        borderRadius: 40,
    },
    button_text: {
        color: "#49688d",
        fontSize: 16,
        fontWeight: "600",
        textAlign: 'center',
    },
    button1: {
        width: 40,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button2: {
        width: 40,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text_month: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 10
    },
    text_year: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
    main_control: {
        zIndex: 500,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    control: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    control1: {
        paddingRight: 5,
    },
    header: {

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