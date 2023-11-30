import AsyncStorage from '@react-native-async-storage/async-storage';

const get_local_account = async (name) => {
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
const set_local_account = async (name, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(name, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
}
const remove_local_account = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
    return true;
  } catch (e) {
    return false;
  }
}
export {
  get_local_account, set_local_account, remove_local_account
}