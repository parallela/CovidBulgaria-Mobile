import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { createStore, applyMiddleware } from "redux";
import { registerRootComponent } from "expo";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Wrapper from './components/Wrapper';
import Reducers from "./reducers/Combine";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsAndroid, Platform, Text } from "react-native";
import { navigationRef } from "./helpers/Navigator";

/**
 * Components
 */
import Home from './screens/Home';
import CitiesData from './screens/CitiesData';

const store = createStore(Reducers, applyMiddleware(thunk));
/*
 * TODO:
 * [x] 1. Wrap everything with parent component
 * [x] 2. Search bar
 * [x] 3. Save searched cities.
 * [x] 4. Check if the city is undefined and suggest nearest city.
 * 5. Animated background
 * 6. Fancy and animated font
 * 9. Add errors binding on every reducer
 * [!]10. Save searched city if theres no information about the user city.
 */

const Drawer = createDrawerNavigator();

/**
 * Expo libraries 
 */
import * as Perm from "expo-permissions";

const App = () => {
    const [locationStatus, setLocationStatus] = useState(false);

    /**
     * Ask for the user location.
     * If the user doesn't allow that, it will bring NOGrantedPermission component.
     */
    const askForLocationPermission = async () => {
        const { status } = await Perm.askAsync(Perm.LOCATION);
        if (status === 'granted') {
            setLocationStatus(true);
        }
    }

    useEffect(() => {
        askForLocationPermission();
    }, []);

    return (
        <Provider store={store}>
            {locationStatus &&
                <NavigationContainer ref={navigationRef}>
                    <Wrapper />
                    <Drawer.Navigator initialRouteName="Начало">
                        {
                            /** 
                              * If the city is undefined change main home component to another component wich suggest nearest city or 
                              * Make user to select from existing one. 
                              */
                        }
                        <Drawer.Screen name="Начало" component={Home} />
                        <Drawer.Screen name="Повече информация" component={CitiesData} />
                    </Drawer.Navigator>
                </NavigationContainer>
            }
        </Provider >
    );
}


export default App;

if (Platform.OS === "android") {
    registerRootComponent(App);
} else AppRegistry.registerComponent('CovidBG', () => App);