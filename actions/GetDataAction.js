export const getDataByLocation = location => {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);


    return dispatch => {
        dispatch({type: 'FETCHING_DATA_BY_LOCATION'});
        return fetch("https://raw.githubusercontent.com/COVID-19-Bulgaria/covid-database/master/Bulgaria/GeoDataset.json").then(
            res => res.json()
        ).then(res => {
            console.log(longitude, latitude);
            // let data = Object.entries(res).find(element => console.log(element[1].coordinates[0] == longitude && element[1].coordinates[1] == latitude));
            Object.entries(res).reduce((prev, curr) => {
                console.log((Math.round(curr[1].coordinates[0] - longitude) < Math.round(prev[1].coordinates[0] - longitude) ? curr : prev));
                return (Math.round(curr[1].coordinates[0] - longitude) <= Math.round(prev[1].coordinates[0] - longitude) ? curr : prev);
            });
            let data = {};
            dispatch({type: "GET_DATA_BY_LOCATION_SUCCESS", payload: data});
        });
    }
}