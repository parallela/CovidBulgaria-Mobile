import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getDataByLocation} from "../actions/GetDataAction";
import * as Perm from "expo-permissions";
import * as Location from "expo-location";


const GeoDisplay = props => {
    const [geo, setGeo] = useState([]);

    const getUserLocation = async () => {
        let {status} = await Perm.askAsync(Perm.LOCATION);
        if (!status) {
            // throw some error or something. :)
        }

        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
        const {latitude, longitude} = location.coords;
        let geocode = Location.reverseGeocodeAsync({longitude, latitude})
        setGeo(await geocode);
        props.getDataByLocation({latitude, longitude, geo});
    }

    useEffect(() => {
        getUserLocation();
    }, []);
    return (
        <Text>{geo[0] != null ? geo[0].city : "No Data"} {}</Text>
    )
}

const mapStateToProps = state => {
    const {locationData} = state;

    return locationData;
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getDataByLocation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GeoDisplay);