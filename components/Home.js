import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataByLocation } from "../actions/GetDataAction";
import * as Perm from "expo-permissions";
import * as Location from "expo-location";
import { MainUI } from "../styling/UI";
import { SearchBar } from "react-native-elements";
import { DoubleBounce } from "react-native-loader";
import { SafeAreaView, FlatList } from "react-native";

const Home = props => {
    const [geo, setGeo] = useState([]);
    const [search, setSearch] = useState("");

    const getUserLocation = async () => {
        const { status } = await Perm.askAsync(Perm.LOCATION);
        if (!status) {
            /**
             * TODO: Add nice error message for that.
             */
            console.log("Permission danied");
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
        const { latitude, longitude } = location.coords;
        const geocode = Location.reverseGeocodeAsync({ longitude, latitude }).then(data => {
            props.getDataByLocation(data[0]);
            setGeo(data);
        });
    }

    useEffect(() => {
        getUserLocation();
    }, [props.fetched]);
    /**
     * Wrap everything in separated components
     */
    return (
        <>
            <View>
                <SearchBar placeholder="Търси град" value={search} onChange={(keyword) => setSearch(keyword)} containerStyle={MainUI.searchContainer} />
            </View>
            <View style={MainUI.container}>
                {!props.fetched ?
                    <DoubleBounce size={30} color={"#fffff"} /> :
                    <>
                        <Text style={{ fontSize: 50, color: 'white' }}>
                            {props.data.city}
                        </Text>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>
                            <Text style={{ color: 'orange' }}>
                                Заразени:
                    <Text style={{ fontWeight: 'bold' }}>
                                    {` ${props.data.infected}`}
                                </Text>
                            </Text>
                        </Text>

                        <Text style={{ fontSize: 20, textAlign: 'center' }}>
                            <Text style={{ color: 'green' }}>
                                Излекувани:
                    <Text style={{ fontWeight: 'bold' }}>
                                    {` ${props.data.cured}`}
                                </Text>
                            </Text>
                        </Text>

                        <Text style={{ fontSize: 20, textAlign: 'center' }}>

                            <Text style={{ color: 'red' }}>
                                Починали:
                    <Text style={{ fontWeight: 'bold' }}>
                                    {` ${props.data.fatal}`}
                                </Text>
                            </Text>
                        </Text>
                    </>
                }
            </View>
        </>
    )
}


const mapStateToProps = state => {
    const { locationData } = state;

    return locationData;
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getDataByLocation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);