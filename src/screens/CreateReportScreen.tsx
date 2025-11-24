"use client"

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CreateReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hier komt report</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
