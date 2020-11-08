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
import SearchItems from "./SearchItems";

const Home = props => {
    const [geo, setGeo] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const items = [
        {
            name: "Vratsa"
        },
        {
            name: "Blagoevgrad"
        }
    ];

    const searchItems = text => {
        console.log(text);
        setSearch(text);
        const newSearchData = items.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toString().toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setSearchData(newSearchData);
    }

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
        setSearchData(items);
        getUserLocation();
    }, [props.fetched]);
    /**
     * Wrap everything in separated components
     */
    return (
        <>
            <View>
                <SearchBar placeholder="Търси град" round={true} onFocus={() => setShowSearchDropdown(true)} value={search} onChangeText={(keyword) => searchItems(keyword)} containerStyle={MainUI.searchContainer} />
                {showSearchDropdown &&
                    <FlatList data={searchData} renderItem={({ item }) => (<SearchItems item={item} />)} keyExtractor={item => item.name} ItemSeparatorComponent={renderSeperator} />
                }
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

const renderSeperator = props => {
    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CED0CE',
            }}
        />
    );
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