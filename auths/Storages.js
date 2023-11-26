import AsyncStorage from '@react-native-async-storage/async-storage';

const Storages = {
  saveData: async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  },
  getData: async (key) => {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  },
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  },
};

export default Storages;
