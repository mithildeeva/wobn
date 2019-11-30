import React, {useState} from 'react';
import './index.scss'
import {useDispatch} from 'react-redux';
import {useSelectAvailableLhs, useSelectAvailableOperator, useSelectAvailableRhs, useSelectSelectedRhs} from "./selector";
import {UPDATE_FILTER_IN_LIST} from "../../constants";
import SingleSelectDropdown from "../SingleSelectDropdown/index";
import MultiSelectDropdown from "../MultiSelectDropdown/index";
import TextInput from "../TextInput/index";
import NumberInput from "../NumberInput/index";

const Filter = props => {
    const filterProp = props.filterData ? props.filterData : {
        lhs: null,
        operator: null,
        rhs: null,
    };
    const index = props.index;
    const [filterState, setFilterState] = useState(filterProp);
    const availableLhs = useSelectAvailableLhs();
    // show available operators only when an lhs is selected
    const availableOperators = useSelectAvailableOperator(filterState.lhs ? filterState.lhs.id : null);
    // show rhs only when an operator is selected
    const availableRhs = useSelectAvailableRhs(filterState.lhs ? filterState.lhs.id : null);
    const selectedRhs = useSelectSelectedRhs(filterState.operator ? index : null);
    const dispatch = useDispatch();


    const shouldDispatchFilterListUpdate = filter => {
        return filter.lhs !== null
            && filter.operator !== null
            && filter.rhs !== null;
    };

    const lhsChanged = newLhs => {
        let newFilter = Object.assign({}, filterState, {lhs: newLhs, operator: null, rhs: null});
        processUpdate(newFilter);
    };

    const operatorChanged = newOperator => {
        let newFilter = Object.assign({}, filterState, {operator: newOperator});
        processUpdate(newFilter);
    };

    const rhsChanged = newRhs => {
        let newFilter = Object.assign({}, filterState, {rhs: newRhs});
        processUpdate(newFilter);
    };

    const processUpdate = newFilter => {
        setFilterState(newFilter);

        // dispatch action to update filter list
        if (shouldDispatchFilterListUpdate(newFilter)) {
            dispatch({
                type: UPDATE_FILTER_IN_LIST,
                payload: {
                    filter: newFilter,
                    index
                },
            });
        }
    };

    const getLhsDropdown = () => {
        return (
            <SingleSelectDropdown
                key={filterState.lhs ? filterState.lhs.id : 'empty-lhs'}
                placeholder='dimension/metric'
                selected={filterState.lhs}
                availableValues={availableLhs}
                onChange={lhsChanged}
            />
        );
    };

    const getOperatorDropdown = () => {
        if (availableOperators === null) return ('');

        return (
            <SingleSelectDropdown
                key={filterState.operator ? filterState.operator : 'empty-op'}
                placeholder='operator'
                selected={filterState.operator}
                availableValues={availableOperators}
                onChange={operatorChanged}
            />
        );
    };

    const getRhsJSX = () => {
        if (filterState.lhs === null) return ('');

        switch (filterState.lhs.id) {
            case 'account':
            case 'country':
                return (
                    <MultiSelectDropdown
                        key={filterState.rhs ? filterState.rhs.length : 'empty-rhs'}
                        placeholder={filterState.lhs.label}
                        selected={selectedRhs}
                        available={availableRhs}
                        onChange={rhsChanged}
                    />
                );
            case 'campaign_name':
                return (
                    <TextInput
                        key={filterState.rhs ? filterState.rhs : 'empty-rhs'}
                        placeholder='Enter Campaign'
                        value={selectedRhs}
                        onChange={rhsChanged}
                    />
                );
            case 'revenue':
                return (
                    <NumberInput
                        key={filterState.rhs ? filterState.rhs : 'empty-rhs'}
                        placeholder='Enter Number'
                        value={selectedRhs}
                        onChange={rhsChanged}
                    />
                );
            default:
                return ('');
        }
    };

    return (
        <div className='filter-row'>
            {getLhsDropdown()}
            {getOperatorDropdown()}
            {getRhsJSX()}
        </div>
    )
};

export default Filter;