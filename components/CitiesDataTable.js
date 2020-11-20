import React from "react";
import PropTypes from "prop-types";
import { MainUI } from "../styling/UI"

import { DataTable } from 'react-native-paper';
import { Text, ScrollView } from "react-native";

const CitiesDataTable = ({ cities }) => {

    return (
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
                {Object.entries(cities).map((val, index) => (
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
    );

}

export default CitiesDataTable;

CitiesDataTable.propTypes = {
    cities: PropTypes.object.isRequired,
}