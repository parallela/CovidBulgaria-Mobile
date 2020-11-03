import React from 'react';
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import GetInformationByLocation from "./reducers/GetInformationByLocation";
import GeoDisplay from "./components/GeoDisplay";
import { SearchBar, Header } from "react-native-elements";

const store = createStore(GetInformationByLocation, applyMiddleware(thunk));
/*
 * TODO:
 * 1. Wrap everything with parent component
 * 2. Search bar
 * 3. Save searched cities.
 * 4. Check if the city is undefined and suggest nearest city.
 * 5. Animated background
 * 6. Fancy and animated font
 * 7. Setup menu преди показване на приложението
 */
const App = () => {

    return (
        <Provider store={store}>
            <StatusBar backgroundColor={"#011E25"} />
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'COVID Bulgaria', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={'#011E25'}
            />
            <View>
                <SearchBar placeholder="Търси град" containerStyle={styles.searchContainer} />
            </View>
            <View style={styles.container}>
                <GeoDisplay />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#073642",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        backgroundColor: '#073642',
        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    }
});

export default App;