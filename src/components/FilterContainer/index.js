import React, { useState } from 'react';
import './index.scss';
import { useSelectFilterList } from "./selector";
import Filter from "../Filter/index";
import {useSelectAvailableLhs} from "../Filter/selector";


const FilterContainer = () => {

    const filterList = useSelectFilterList();
    const availableLhs = useSelectAvailableLhs();

    const [emptyFilter, setEmptyFilter] = useState(null);

    const invisibleInput = (<input type='text' className='invisible-element'/>);

    const addNewFilter = () => {
        setEmptyFilter({
            lhs: null,
            operator: null,
            rhs: null,
        })
    };

    const removeFilter = index => {
        // todo: dispatch remove filter
    };

    const removeEmptyFilter = () => {
        setEmptyFilter(null);
    };

    const hasEmptyFilter = () => emptyFilter !== null;

    const canAddFilter = () => {
        return !hasEmptyFilter() && availableLhs && availableLhs.length !== 0;
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
        if (emptyFilter === null) return ('');
        return (
            <div className="filters">
                <Filter index={null} filterData={emptyFilter} onFocusChange={onFocusChange}/>
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
                    <div style="padding: 10px;">
                        <h4>where</h4>
                    </div>

                    <div className="filters">
                        {
                            filterList.map((filter, index) => (
                                <div className='filter'>

                                    <Filter
                                        index={index}
                                        filterData={filter}
                                        onFocusChange={onFocusChange}
                                        // key={`${filter.lhs.id}-${filter.operator.id}`}
                                    />
                                    {getCloseButton(index)}
                                </div>
                            ))
                            (getEmptyFilterJSX())
                        }
                    </div>
                </div>

                <div>
                    <button onClick={addNewFilter} disabled={canAddFilter}>
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