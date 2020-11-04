import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';
import { MainUI } from '../styling/UI';
import * as Navigator from "../helpers/Navigator";
import { DrawerActions } from "@react-navigation/native";

const Wrapper = (props) => {

    const [search, setSearch] = useState(true);

    const drawer = () => {
        Navigator.navigationRef.current.dispatch(DrawerActions.openDrawer())
    }


    useEffect(() => {
    }, []);

    return (
        <>
            <StatusBar backgroundColor={"#011E25"} />
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { drawer() } }}
                centerComponent={{ text: 'COVID Bulgaria', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={'#011E25'}
            />
            {search &&
                <SearchBar placeholder="Търси град" containerStyle={MainUI.searchContainer} />
            }
        </>
    )

}

export default Wrapper;