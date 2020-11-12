import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataByLocation, getSearchItems } from "../actions/GetDataAction";
import * as Perm from "expo-permissions";
import * as Location from "expo-location";
import { MainUI } from "../styling/UI";
import { SearchBar } from "react-native-elements";
import { DoubleBounce } from "react-native-loader";
import { FlatList, Pressable, Keyboard, Text, View } from "react-native";
import SearchItems from "./SearchItems";
import { ObjectEmpty } from "../helpers/DataValidator";

const Home = props => {
    const [searchDataItems, setSearchDataItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [customCity, setCustomCity] = useState({});

    const setLocation = city => {
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            setCustomCity({ ...res[city], city: city });
            setShowSearchDropdown(false);
        });
    }

    const searchItems = text => {
        setSearch(text);
        /**
         * If the search query is less than one word, we hide the search suggestions.
         */
        if (text.toString().length === 0) {
            setShowSearchDropdown(false);
        } else setShowSearchDropdown(true);

        const newSearchData = searchDataItems.filter(item => {
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
        });
    }

    useEffect(() => {
        getUserLocation();
        props.getSearchItems();

        setSearchDataItems(props.cities.data);
    }, [props.location.fetched, props.cities.fetched]);
    /**
     * Wrap everything in separated components
     */
    return (
        <>
            <View>
                <SearchBar
                    placeholder="Търси град"
                    round={true}
                    onFocus={() => setShowSearchDropdown(true)}
                    onCancel={() => setShowSearchDropdown(false)}
                    value={search}
                    onChangeText={(keyword) => searchItems(keyword)}
                    containerStyle={MainUI.searchContainer}
                />
                {showSearchDropdown &&
                    <FlatList data={searchData} renderItem={({ item }) => (<SearchItems setLocation={setLocation} item={item} />)} keyExtractor={item => item.name} ItemSeparatorComponent={renderSeperator} />
                }
            </View>
            <Pressable style={MainUI.container}
                onPress={() => { Keyboard.dismiss(); setShowSearchDropdown(false); }}
            >
                <View>
                    {(!props.location.fetched || showSearchDropdown) ?
                        <DoubleBounce size={30} color={"#fffff"} /> :
                        <>
                            <Text style={{ fontSize: 50, color: 'white' }}>
                                {ObjectEmpty(customCity) ? props.location.data.city : customCity.city}
                            </Text>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                <Text style={{ color: 'orange' }}>
                                    Заразени:
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {` ${ObjectEmpty(customCity) ? props.location.data.infected : customCity.infected}`}
                                    </Text>
                                </Text>
                            </Text>

                            <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                <Text style={{ color: 'green' }}>
                                    Излекувани:
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {` ${ObjectEmpty(customCity) ? props.location.data.cured : customCity.cured}`}
                                    </Text>
                                </Text>
                            </Text>

                            <Text style={{ fontSize: 20, textAlign: 'center' }}>

                                <Text style={{ color: 'red' }}>
                                    Починали:
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {` ${ObjectEmpty(customCity) ? props.location.data.fatal : customCity.fatal}`}
                                    </Text>
                                </Text>
                            </Text>
                        </>
                    }
                </View>
            </Pressable>
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
    return state;
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getDataByLocation,
        getSearchItems
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);