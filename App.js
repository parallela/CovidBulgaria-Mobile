import React from 'react';
import { WebView } from "react-native-webview";

const App = () => {
  return (
    <WebView source={{ uri: "https://covidbulgaria.com" }} />
  );
}


export default App;