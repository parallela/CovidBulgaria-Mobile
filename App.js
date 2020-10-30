import React from 'react';
import { WebView } from "react-native-webview";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <WebView source={{ uri: "https://covidbulgaria.com" }} barStyle="light-content" />
      <StatusBar backgroundColor="#073642" />
    </>
  );
}


export default App;