import React, {useState, useEffect, useRef} from 'react';
import './index.scss';

const SingleSelectDropdown = (props) => {

    const nodeRef = useRef(null);

    const [state, setState] = useState({
        selected: props.selected,
        availableValues: props.availableValues,
        menuOpen: false,
    });

    const handleBlur = (e) => {
        if (nodeRef.current.contains(e.target)) return;

        setState(Object.assign({}, state, {menuOpen: false}));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur, false);
        return () => {
            document.removeEventListener('mousedown', handleBlur, false)
        };
    }, []);

    const onSelect = (e) => {
        const selectedValueArr = e.currentTarget.dataset.value.split('~~');
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
        setState(Object.assign({}, state, {selected, availableValues, menuOpen: false}));

        // calling onChange of parent with newly selected value obj
        props.onChange(selected);
    };

    const toggleDropdownMenu = () => {
        setState(Object.assign({}, state, {
            menuOpen: !state.menuOpen
        }))
    };

    const getOptions = () => {
        return state.availableValues.map((valueObj) => {
            let isSelectedObj = state.selected && state.selected.id === valueObj.id;
            return (

                <div
                    key={valueObj.id}
                    data-value={`${valueObj.id}~~${valueObj.label}`}
                    className={isSelectedObj ? 'menu-option selected' : 'menu-option'}
                    onClick={onSelect}
                >
                    <div className='option-item'>
                        <label className='label'>
                            {valueObj.label}
                        </label>
                    </div>


                </div>
            );
        });
    };

    const getMenuBody = () => {
        return (
            <div className='menu-body'>
                {getOptions()}
            </div>
        );
    };

    const getDropdownButton = () => {
        return (
            <div className='open-button' onClick={toggleDropdownMenu}>
                <span>
                    {state.selected ? state.selected.label : props.placeholder ? props.placeholder : 'select option'}
                </span>
                <div>^</div>
            </div>
        );
    };

    const getDropdownMenu = () => {
        if (!state.menuOpen) return ('');
        return (
            <div className='menu'>
                {getMenuBody()}
            </div>
        );
    };

    return (
        <div className="single-drop-down-parent" ref={nodeRef}>
            {getDropdownButton()}
            {getDropdownMenu()}
        </div>
    );
};

export default SingleSelectDropdown;