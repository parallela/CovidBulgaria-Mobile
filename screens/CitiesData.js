import React from "react";

/**
 * React native elements
 */
import { Text, View } from "react-native";

/**
 * Elements and styling
 */
import { MainUI } from "../styling/UI";

const CitiesData = props => {
    return (
        <View style={MainUI.container}>
            <Text>Hello world</Text>
        </View>
    );
}

export default CitiesData;