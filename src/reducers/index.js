import {produce} from "immer";
import {
    ADD_EMPTY_FILTER, lhsApi, REMOVE_EMPTY_FILTER, REMOVE_FILTER_FROM_LIST,
    UPDATE_FILTER_IN_LIST
} from "../constants";

const filters = produce((draftState = {emptyFilter: true}, action) => {
    const {type, payload} = action;
    switch (type) {
        case ADD_EMPTY_FILTER:
            draftState.emptyFilter = true;
            return draftState;
        case REMOVE_EMPTY_FILTER:
            draftState.emptyFilter = false;
            return draftState;
        case UPDATE_FILTER_IN_LIST:
            draftState.emptyFilter = false;
            // init the filterList's normalized data
            draftState.selectedLhs = draftState.selectedLhs === undefined ? [] : draftState.selectedLhs;
            draftState.selectedOps = draftState.selectedOps === undefined ? [] : draftState.selectedOps;
            draftState.selectedRhs = draftState.selectedRhs === undefined ? [] : draftState.selectedRhs;

            // if index = null, it means this is a new filter (and not update on existing filter)
            if (payload.index === null) {
                draftState.selectedLhs.push(payload.filter.lhs.id);
                draftState.selectedOps.push(payload.filter.operator.id);
                draftState.selectedRhs.push(payload.filter.rhs);

                return draftState;
            }

            // it is an update for an existing filter
            draftState.selectedLhs[payload.index] = payload.filter.lhs.id;
            draftState.selectedOps[payload.index] = payload.filter.operator.id;
            draftState.selectedRhs[payload.index] = payload.filter.rhs;

            return draftState;
        case REMOVE_FILTER_FROM_LIST:
            draftState.selectedLhs.splice(payload.index, 1);
            draftState.selectedOps.splice(payload.index, 1);
            draftState.selectedRhs.splice(payload.index, 1);

            return draftState;
        default:
            return draftState;
    }
});

const dimMetrics = produce((draftState = lhsApi) => {
    return draftState
});

export {
    dimMetrics,
    filters,
};