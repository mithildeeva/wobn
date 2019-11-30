import React, {useState} from 'react';
import './index.scss';

const SingleSelectDropdown = (props) => {

    const [state, setState] = useState({
        selected: props.selected,
        availableValues: props.availableValues,
    });

    const onSelect = (e) => {
        const selectedValueArr = e.target.value.split('~~');
        // if value changed to itself
        if (state.selectedRhs && state.selected.id === selectedValueArr[0]) return;

        const selected = {id: selectedValueArr[0], label: selectedValueArr[1]};

        // removing selected item from available values
        let availableValues = state.availableValues.filter(value => value.id !== selected.id);

        // adding previously selected value to availableValues
        if (state.selected !== null) {
            availableValues.push(state.selected);
        }

        // updating local state
        setState(Object.assign({}, state, {selected, availableValues}));

        // calling onChange of parent with newly selected value obj
        props.onChange(selected);
    };

    const getPlaceholderOption = () => {
        return (
            <option
                value="select_placeholder"
                // disabled
                // selected
                hidden
            >
                {props.placeholder ? props.placeholder : 'select an option'}
            </option>
        );
    };

    const getSelectedOption = () => {
        return (
            <option
                value={`${state.selected.id}~~${state.selected.label}`}
                selected
            >
                {state.selected.label}
            </option>
        );
    };

    const getOptions = () => {
        console.log(state.availableValues, state.selected);
        const op = state.availableValues.map((valueObj) => {
            if (state.selected && state.selected.id === valueObj.id) return getSelectedOption();
            return (
                <option
                    key={valueObj.id}
                    value={`${valueObj.id}~~${valueObj.label}`}
                >
                    {valueObj.label}
                </option>
            );
        });

        console.log(op);

        return op;
    };

    return (
        <div className="single-select-dropdown">
            <select onChange={onSelect} defaultValue={props.placeholder ? props.placeholder : 'select an option'}>
                {state.selected === null ? getPlaceholderOption() : ('')}
                {getOptions()}
            </select>
            <div className="select_arrow"></div>
        </div>
    );
};

export default SingleSelectDropdown;