import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import { MainUI } from "../styling/UI";

const CityNotFound = ({ city }) => {
    return (
        <>
            <Text style={MainUI.textMiddle}>
                Все още нямаме информация за
                                    </Text>
            <Text style={MainUI.textMiddle}>
                {city}
            </Text>
        </>
    );
}

export default CityNotFound;

CityNotFound.propTypes = {
    city: PropTypes.string.isRequired
}