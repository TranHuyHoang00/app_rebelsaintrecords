import AsyncStorage from '@react-native-async-storage/async-storage';

const get_local = async (name) => {
  try {
    let raw = await AsyncStorage.getItem(name);
    const value = JSON.parse(raw);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
const set_local = async (name, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(name, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
}
const remove_local = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
    return true;
  } catch (e) {
    return false;
  }
}
export {
  get_local, set_local, remove_local
}