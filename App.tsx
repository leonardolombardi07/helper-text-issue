import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import LoggedInScreen from "./src/screens/LoggedInScreen";

export default function AppWithProviders() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

function App() {
  return <LoggedInScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
