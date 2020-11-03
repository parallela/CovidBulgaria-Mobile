import {translateCity} from "../helpers/CityTranslator";

export const getDataByLocation = location => {
    return dispatch => {
        dispatch({type: 'FETCHING_DATA_BY_LOCATION'});
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            let data = {...res[translateCity(location.geo[0].city)], city: translateCity(location.geo[0].city)};
            dispatch({type: "GET_DATA_BY_LOCATION_SUCCESS", payload: data});
        });
    }
}