import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import * as Navigator from "../helpers/Navigator";
import { DrawerActions } from "@react-navigation/native";

const Wrapper = (props) => {
    const drawer = () => {
        Navigator.navigationRef.current.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <>
            <StatusBar backgroundColor={"#011E25"} />
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { drawer() } }}
                centerComponent={{ text: 'COVID Bulgaria', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: () => { Navigator.navigate('Начало') } }}
                backgroundColor={'#011E25'}
            />
        </>
    )

}

export default Wrapper;