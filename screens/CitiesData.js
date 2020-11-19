import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCities } from "../actions/GetDataAction"
import { bindActionCreators } from "redux";

/**
 * React native elements
 */
import { View } from "react-native";

/**
 * Elements and styling
 */
import { MainUI } from "../styling/UI";
import { ScrollView } from "react-native-gesture-handler";
import CitiesDataTable from "../components/CitiesDataTable";
import { DoubleBounce } from "react-native-loader"


const CitiesData = props => {

    useEffect(() => {
        props.getCities();
    }, [props.cities.fetched]);


    return (
        <View style={MainUI.container}>
            {!props.cities.fetched ? <DoubleBounce size={30} color={"#fffff"} /> : <CitiesDataTable cities={props.cities.data} />}
        </View>
    );
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCities,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CitiesData);