import React from "react";
import { View, Text } from "react-native";
import { MainUI } from "../styling/UI";
import PropTypes from "prop-types";

const SearchItems = props => {
    return (
        <View style={MainUI.item}>
            <Text style={MainUI.title}>{"Text"}</Text>
        </View>
    );
}

export default SearchItems;

SearchItems.propTypes = {
    items: PropTypes.any.isRequired
}