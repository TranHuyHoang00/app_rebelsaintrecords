import * as Linking from "expo-linking";

const handle_phone_press = async (phone) => {
    if (!phone || phone == undefined || phone == '') {
        return;
    } else {
        Linking.openURL(`tel:${phone}`);
    }
}
export {
    handle_phone_press
}