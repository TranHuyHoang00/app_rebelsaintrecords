import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from '../../components/footer';
import Header from '../../components/header';
const bg = require("../../assets/images/bg.png");
import { get_list_schedule } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
const schedule = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [Schedules, setSchedules] = useState([]);
  useEffect(() => {
    handle_get_list_schedule(params);
  }, []);

  const handle_get_list_schedule = async (value) => {
    try {
      const data = await get_list_schedule(value);
      if (data && data.data && data.data.success == 1) {
        let data_raw = data.data.data;
        data_raw.sort((a, b) => {
          const dateA = new Date(a.time_localtion_id.show_time);
          const dateB = new Date(b.time_localtion_id.show_time);
          return dateA - dateB;
        });
        setSchedules(data_raw)
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
  const on_click_screen = (id) => {
    router.push({ pathname: `schedule/${id}` });
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <Header />
        <View style={styles.main}>
          <View style={styles.container_menu}>
            <Pressable style={styles.button} onPress={() => router.back()} >
              <Text style={styles.button_text}>BACK</Text>
              <AntDesign name="caretleft" size={16} color="#49688d" />
            </Pressable>
            <View style={styles.container_menu}>
              <AntDesign name="calendar" size={20} color="white" />
              <Text style={styles.text_menu}>  {params && params.date}</Text>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container_schedule}>
              {Schedules && Schedules.map((item, index) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => on_click_screen(item.id)}>
                    <View style={styles.main_schedule}>
                      <Image source={{ uri: item.user_id && item.user_id.avatar }} style={styles.image} />
                      <View style={styles.container_text}>
                        <Text style={styles.text_info}>Schedule Info {index + 1} </Text>
                        <Text style={styles.text_brand}>{item.brand_id && item.brand_id.name}</Text>
                      </View>
                      <View>
                        <Text style={styles.time}>{format_time(item.time_localtion_id && item.time_localtion_id.show_time)} </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <Footer />
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
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
  text_menu: {
    color: '#ffde59',
    fontSize: 18,
    fontWeight: '500',
  },
  container_menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container_schedule: {

  },
  time: {
    borderColor: "#636663",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    fontWeight: '500'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
    resizeMode: 'cover',
  },
  container_text: {
    textAlign: 'center',
  },
  text_info: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
  },
  text_brand: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: "500",
    color: '#737573',
  },
  main_schedule: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
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
export default schedule
