import { useSelector } from 'react-redux';

export function useSelectFilterList() {
    return useSelector(state => {
        if (! state.filters.selectedLhs || state.filters.selectedLhs.length === 0) return [];

        return state.filters.selectedLhs.map((lhsId, index) => {
            let operatorId = state.filters.selectedOps[index];
            return {
                lhs: {
                    id: lhsId,
                    label: state.dimMetrics.lhs[lhsId].label,
                },
                operator: state.dimMetrics.lhs[lhsId].operators.find(operator => operator.id === operatorId),
                rhs: state.filters.selectedRhs[index],
            }
        });
    })
}

export function useSelectEmptyFilter() {
    return useSelector(state => {
        return state.filters.emptyFilter ? true : false;
    })
}