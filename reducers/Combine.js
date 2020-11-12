import { combineReducers } from "redux";
import GetInformationByLocation from "./GetInformationByLocation";
import GetCities from "./GetCities";

export default combineReducers({
    location: GetInformationByLocation,
    cities: GetCities,
});