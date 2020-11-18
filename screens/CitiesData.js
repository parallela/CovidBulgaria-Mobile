import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCities } from "../actions/GetDataAction"
import { bindActionCreators } from "redux";

/**
 * React native elements
 */
import { Text, View } from "react-native";
import { DataTable } from 'react-native-paper';

/**
 * Elements and styling
 */
import { MainUI } from "../styling/UI";
import { ScrollView } from "react-native-gesture-handler";


const CitiesData = props => {

    useEffect(() => {
        props.getCities();
    }, [props.cities.fetched]);

    return (
        <View style={MainUI.container}>
            <DataTable style={MainUI.container_full}>
                <DataTable.Header style={{ backgroundColor: "#001322" }}>
                    <DataTable.Title>
                        <Text style={{ color: 'white' }}>Град</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={{ color: 'white' }}>Заразени</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={{ color: 'white' }}>Излекувани</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={{ color: 'white' }}>Починали</Text>
                    </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {Object.entries(props.cities.data).map((val, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>
                                <Text style={{ color: 'white' }}>{val[0]}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text style={{ color: 'orange' }}>{val[1].infected}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text style={{ color: 'green' }}>{val[1].cured}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text style={{ color: 'red' }}>{val[1].fatal}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>
            </DataTable>
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