import React, { useEffect, useMemo, useState } from "react";
import { View, FlatList, Pressable, Keyboard } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataByLocation, getSearchItems } from "../actions/GetDataAction";
import { ObjectEmpty } from "../helpers/DataValidator";

/**
 * Components
 */
import SearchItems from "../components/SearchItems";
import RenderSepartor from "../components/RenderSeperator";
import CityNotFound from "../components/CityNotFound";
import Statistics from "../components/Statistics";


/**
 * React native elements
 */
import { SearchBar } from "react-native-elements";
import { DoubleBounce } from "react-native-loader";
import { MainUI } from "../styling/UI";

/**
 * Expo libraries
 */
import * as Perm from "expo-permissions";
import * as Location from "expo-location"
const Home = props => {
    const [searchDataItems, setSearchDataItems] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)
    const [search, setSearch] = useState("");
    const [customCity, setCustomCity] = useState({});

    /**
     * Get user location by Google Location Service.
     */
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

    /**
     * Set custom location
     * @param {String} city 
     */
    const setLocation = city => {
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            setCustomCity({ ...res[city], city: city });
            setShowSearchDropdown(false);
        });
    }

    /**
     * Searchbar logic
     * @param {String} text 
     */
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

    useMemo(() => {
        getUserLocation();
    }, [props.location.fetched]);


    useEffect(() => {
        props.getSearchItems();
        setSearchDataItems(props.cities.data)
    }, [props.cities.fetched])

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
                    <FlatList data={searchData} renderItem={({ item }) => (<SearchItems setLocation={setLocation} item={item} />)} keyExtractor={item => item.name} ItemSeparatorComponent={RenderSepartor} />
                }
            </View>
            <Pressable style={MainUI.container}
                onPress={() => { Keyboard.dismiss(); setShowSearchDropdown(false); }}
            >
                <>
                    {(showSearchDropdown || ObjectEmpty(customCity) && props.location.data.city === undefined) &&
                        <View style={MainUI.container2}>
                            <DoubleBounce size={30} color={"#fffff"} />
                            {((props.location.data.city === undefined && props.location.fetched) && !showSearchDropdown) &&
                                <CityNotFound city={props.location.data.originalCityName} />
                            }
                        </View>
                    }
                    {(props.location.data.city !== undefined && !showSearchDropdown) &&
                        <Statistics
                            city={ObjectEmpty(customCity) ? props.location.data.city : customCity.city}
                            cured={ObjectEmpty(customCity) ? props.location.data.cured : customCity.cured}
                            fatal={ObjectEmpty(customCity) ? props.location.data.fatal : customCity.fatal}
                            infected={ObjectEmpty(customCity) ? props.location.data.infected : customCity.infected}
                        />
                    }
                </>
            </Pressable>
        </>
    );
}


const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getDataByLocation,
        getSearchItems,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);