import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from "react-native";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import GetInformationByLocation from "./reducers/GetInformationByLocation";
import GeoDisplay from "./components/GeoDisplay";

const store = createStore(GetInformationByLocation, applyMiddleware(thunk));

const App = () => {

    return (
        <Provider store={store}>
            <View>
                <StatusBar backgroundColor={"blue"}/>
                <GeoDisplay/>
            </View>
        </Provider>
    );
}


export default App;