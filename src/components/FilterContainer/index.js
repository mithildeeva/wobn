import React from 'react';
import './index.scss';
import {useSelectEmptyFilter, useSelectFilterList} from "./selector";
import Filter from "../Filter/index";
import {useSelectAvailableLhs} from "../Filter/selector";
import {useDispatch} from "react-redux";
import {ADD_EMPTY_FILTER, REMOVE_EMPTY_FILTER} from "../../constants";


const FilterContainer = () => {

    const filterList = useSelectFilterList();
    const availableLhs = useSelectAvailableLhs();
    const emptyFilterPresent = useSelectEmptyFilter();

    const dispatch = useDispatch();

    const invisibleInput = (<input type='text' className='invisible-element'/>);

    const addNewFilter = () => {
        dispatch({type: ADD_EMPTY_FILTER});
    };

    const removeFilter = index => {
        // todo: dispatch remove filter
    };

    const removeEmptyFilter = () => {
        dispatch({type: REMOVE_EMPTY_FILTER});
    };

    const canAddFilter = () => {
        return !emptyFilterPresent && availableLhs && availableLhs.length !== 0;
    };

    const onFocusChange = index => {
        console.log(`focus changed to ${index}`);
    };

    const getCloseButton = index => {
        if (index === 0 && filterList.length === 1) return ('');
        return (
            <button className='btn-filter-remove' onClick={() => { removeFilter(index) }} key={`action-${index}`}>
                <i className="material-icons">close</i>
            </button>
        );
    };

    const getEmptyFilterJSX = () => {
        if (!emptyFilterPresent) return ('');
        return (
            <div className="filter empty-filter" key='empty-filter'>
                <Filter index={null} filterData={{
                    lhs: null,
                    operator: null,
                    rhs: null,
                }} onFocusChange={onFocusChange}/>
                <button className='btn-filter-remove' onClick={() => { removeEmptyFilter() }} key={`remove-empty-filter`}>
                    <i className="material-icons">close</i>
                </button>
            </div>
        );
    };


    return (
        <div className='filter-container'>
            <div className="filter-body">
                <div className="filter-section">
                    <div style={{padding:'10px'}}>
                        <h4>where</h4>
                    </div>

                    <div className="filters">
                        {
                            filterList.map((filter, index) => (
                                <div className='filter filled-filter' key={index}>

                                    <Filter
                                        key={`${index}-filter`}
                                        index={index}
                                        filterData={filter}
                                        onFocusChange={onFocusChange}
                                        // key={`${filter.lhs.id}-${filter.operator.id}`}
                                    />
                                    {getCloseButton(index)}
                                </div>
                            ))
                        }
                        {(getEmptyFilterJSX())}
                    </div>
                </div>

                <div>
                    <button onClick={addNewFilter} disabled={!canAddFilter()}>
                        <i className="material-icons btn-range-add-icon">add</i> Add
                    </button>
                </div>
            </div>

            <div className="filter-footer">
                <span>Apply</span>
            </div>
        </div>
    );
};

export default FilterContainer;