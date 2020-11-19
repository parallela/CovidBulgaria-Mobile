import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Statistics = ({ infected, cured, fatal, city }) => {
    return (
        <View>
            <Text style={{ fontSize: 50, color: 'white', fontFamily: 'Inter_200ExtraLight' }}>
                {city}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Inter_200ExtraLight' }}>
                <Text style={{ color: 'orange' }}>
                    Заразени:
                                    <Text style={{ fontWeight: 'bold' }}>
                        {` ${infected}`}
                    </Text>
                </Text>
            </Text>

            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Inter_200ExtraLight' }}>
                <Text style={{ color: 'green' }}>
                    Излекувани:
                                    <Text style={{ fontWeight: 'bold' }}>
                        {` ${cured}`}
                    </Text>
                </Text>
            </Text>

            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Inter_200ExtraLight' }}>

                <Text style={{ color: 'red' }}>
                    Починали:
                                    <Text style={{ fontWeight: 'bold' }}>
                        {` ${fatal}`}
                    </Text>
                </Text>
            </Text>
        </View>
    );
}

export default Statistics;

Statistics.propTypes = {
    infected: PropTypes.number.isRequired,
    cured: PropTypes.number.isRequired,
    fatal: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired
}