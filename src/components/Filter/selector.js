import { useSelector } from 'react-redux';
import {FREE_FORM_VALUE} from "../../constants";

export function useSelectAvailableLhs() {
    return useSelector(state => {
        if (! state.filters.selectedLhs || state.filters.selectedLhs.length === 0) {
            return Object.keys(state.dimMetrics.lhs).map(lhsId => ({
                id: lhsId,
                label: state.dimMetrics.lhs[lhsId].label,
            }));
        }

        // creating a map of SELECTED lhsId to OperatorId-array
        let selectedLhsIdToOpId = {};
        for (let i = 0; i < state.filters.selectedLhs.length; i++) {

            const selectedLhs = state.filters.selectedLhs[i];
            const selectedOp = state.filters.selectedOps[i];

            if (selectedLhsIdToOpId[selectedLhs] === undefined) {
                selectedLhsIdToOpId[selectedLhs] = [];
            }

            selectedLhsIdToOpId[selectedLhs].push(selectedOp);
        }

        // looping over lhs and checking if any lhs (with untouched operators) still exist
        let availableLhs = [];
        for (const lhsId in state.dimMetrics.lhs) {
            if (selectedLhsIdToOpId[lhsId] === undefined
                || selectedLhsIdToOpId[lhsId].length < state.dimMetrics.lhs[lhsId].operators.length) {
                availableLhs.push({
                    id: lhsId,
                    label: state.dimMetrics.lhs[lhsId].label,
                });
            }
        }

        return availableLhs;

    })
}

export function useSelectAvailableOperator(lhsId) {
    return useSelector(state => {
        if (lhsId === null) return null;
        if (! state.filters.selectedOps || state.filters.selectedOps.length === 0) {
            return state.dimMetrics.lhs[lhsId].operators
        }

        // get all operators currently selected for the given lhs
        const selectedOpsId = state.filters.selectedLhs.reduce((selectedOpsIdForLhs, currLhsId, index) => {
            if (currLhsId !== lhsId) return selectedOpsIdForLhs;

            selectedOpsIdForLhs.push(state.filters.selectedOps[index]);
            return selectedOpsIdForLhs;
        }, []);

        // filter out selected operators and return the remaining
        return state.dimMetrics.lhs[lhsId].operators.filter(operator => !selectedOpsId.includes(operator.id));
    });
}

export function useSelectSelectedRhs(index) {
    return useSelector(state => {
        if (index === null) return null;
        if (! state.filters.selectedRhs || state.filters.selectedRhs.length === 0) {
            return null;
        }
        return state.filters.selectedRhs[index];
    })
}

export function useSelectAvailableRhs(lhsId) {
    return useSelector(state => {
        if (lhsId === null) return null;
        const lhsIdIndex = state.dimMetrics.lhsIds.indexOf(lhsId);

        // null availableValues means any value can be entered (no restricted set)
        if (state.dimMetrics.lhsValues[lhsIdIndex] === FREE_FORM_VALUE) return null;

        // if no rhs have yet been selected, return all rhs for corresponding lhs
        if (state.filters.selectedLhs === undefined || !state.filters.selectedLhs.includes(lhsId)) {
            return state.dimMetrics.lhsValues[lhsIdIndex];
        }

        // extract the rhs that haven't been selected yet
        const selectedRhsIdForLhs = state.filters.selectedLhs.reduce((selectedRhs, currLhsId, index) => {
            if (currLhsId !== lhsId) return selectedRhs;
            selectedRhs.push(...state.filters.selectedRhs[index].map(rhs => rhs.id));
            return selectedRhs;
        }, []);

        let availableRhs = [];
        for (let i = 0; i < state.dimMetrics.lhsValues[lhsIdIndex].length; i++) {
            if (! selectedRhsIdForLhs.includes(state.dimMetrics.lhsValues[lhsIdIndex][i].id)) {
                availableRhs.push(state.dimMetrics.lhsValues[lhsIdIndex][i]);
            }
        }

        return availableRhs;
    });
}