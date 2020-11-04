import 'react-native-gesture-handler';
import React from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import GetInformationByLocation from "./reducers/GetInformationByLocation";
import Wrapper from './components/Wrapper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import GeoDisplay from "./components/GeoDisplay";
import { Text } from "react-native";
import { navigationRef } from "./helpers/Navigator";

const store = createStore(GetInformationByLocation, applyMiddleware(thunk));
/*
 * TODO:
 * [x] 1. Wrap everything with parent component
 * 2. Search bar
 * 3. Save searched cities.
 * 4. Check if the city is undefined and suggest nearest city.
 * 5. Animated background
 * 6. Fancy and animated font
 * 7. Setup menu преди показване на приложението
 * 8. Fix Drawer under the search bar. (Check if the drawer is opened or not state) 
 */

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <Wrapper />
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={GeoDisplay} />
                    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider >
    );
}

const NotificationsScreen = props => {
    return (
        <Text>Hello</Text>
    );
}

export default App;