
import {createStore} from "redux";
import createReducer from "./reducer";
import {lhsApi} from "./constants";

const configureStore = () => {
    return createStore(createReducer(), {dimMetrics: lhsApi});
};

export default configureStore;