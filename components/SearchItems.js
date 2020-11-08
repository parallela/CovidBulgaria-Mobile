import React from "react";
import { View, Text } from "react-native";
import { MainUI } from "../styling/UI";
import PropTypes from "prop-types";

const SearchItems = props => {
    const { item } = props;

    return (
        <View style={MainUI.item}>
            <Text style={MainUI.title}>{item.name}</Text>
        </View>
    );
}

export default SearchItems;

SearchItems.propTypes = {
    item: PropTypes.object.isRequired
}