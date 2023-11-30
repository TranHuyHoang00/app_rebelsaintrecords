import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const CONTROL_HEIGHT = 100;

interface ControlProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Control({ onNext, onPrev }: ControlProps) {
  return (
    <View style={styles.control}>
      <Pressable style={styles.button} onPress={onPrev}>
        <AntDesign name="left" size={24} color="#d60202" />
      </Pressable>
      <Text style={styles.text_month}>MARCH</Text>
      <Pressable style={styles.button} onPress={onNext}>
        <AntDesign name="right" size={24} color="#d60202" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {},
  text_month: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
