import React, {useState, useRef, useEffect} from 'react';
import './index.scss';

const MultiSelectDropdown = (props) => {

    const nodeRef = useRef(null);

    const getDropdownItems = () => {
        let items = [];
        if (props.selected && props.selected.length > 0) {
            const selecteditems = props.selected.map(item => ({
                id: item.id,
                label: item.label,
                checked: true,
            }));

            items.push(...selecteditems);
        }

        if (props.available && props.available.length > 0) {
            const availableitems = props.available.map(item => ({
                id: item.id,
                label: item.label,
                checked: false,
            }));

            items.push(...availableitems);
        }
        return items;
    };

    const [dropdownState, setDropdownState] = useState({
        options: getDropdownItems(),
        menuOpen: false,
    });

    const handleBlur = (e) => {
        if (nodeRef.current.contains(e.target)) return;

        setDropdownState(Object.assign({}, dropdownState, { menuOpen: false }));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur, false);
        return () => {
            document.removeEventListener('mousedown', handleBlur, false)
        };
    }, []);

    const updateSelectForOption = (e) => {
        // id~~label
        const option = e.currentTarget.id.split('~~');
        const newOptions = dropdownState.options.map(item => {
            if (String(option[0]) === String(item.id)) {
                item.checked = !item.checked;
            }
            return item;
        });
        setDropdownState(Object.assign({}, dropdownState, {options:newOptions}));
    };

    const handleOkClick = () => {
        const selectedOptions = dropdownState.options
            .filter(option => option.checked)
            .map(option => ({
                id: option.id,
                label: option.label,
            }));
        setDropdownState(Object.assign({}, dropdownState, {menuOpen: false}));
        props.onChange(selectedOptions.length === 0 ? null : selectedOptions);
    };

    const handleCancelClick = () => {
        setDropdownState(Object.assign({}, dropdownState, {
            options: getDropdownItems(),
            menuOpen: false
        }))
    };

    const toggleDropdownMenu = () => {
        setDropdownState(Object.assign({}, dropdownState, {
            menuOpen: !dropdownState.menuOpen
        }))
    };

    const getDropdownButton = () => {
        return (
            <div className='open-button' onClick={toggleDropdownMenu}>
                <div>{props.selected ? props.selected.length : ''}</div>
                <span>{props.placeholder}</span>
                <div>^</div>
            </div>
        );
    };

    const getMenuHeader = () => {
        return (
            <div className='menu-header'>
                <div>O</div>
                <input
                    placeholder='Search'
                    type='search'
                    className='search-input'
                />
            </div>
        );
    };

    const getMenuBody = () => {

        // let options = [];
        // if (dropdownState.selected && dropdownState.selected.length > 0) {
        //     const selectedOptions = dropdownState.selected.map((option) => (
        //         <div className='menu-option'>
        //             <input type='checkbox' value={`${option.id}~~${option.label}`} checked/>
        //             <label className='checkbox-label'>
        //                 {option.label}
        //             </label>
        //         </div>
        //     ));
        //     options.push(...selectedOptions);
        // }
        //
        // if (dropdownState.available && dropdownState.available.length > 0) {
        //     const availableOptions = dropdownState.available.map(option => (
        //         <div className='menu-option'>
        //             <input type='checkbox' value={`${option.id}~~${option.label}`} />
        //             <label className='checkbox-label'>
        //                 {option.label}
        //             </label>
        //         </div>
        //     ));
        //     options.push(...availableOptions);
        // }

        return (
            <div className='menu-body'>
                {dropdownState.options.map((option, index) => (
                <div
                    key={`${option.id}~~${option.label}`}
                    className='menu-option'
                    id={`${option.id}~~${option.label}`}
                    onClick={updateSelectForOption}
                >
                    <input
                        type='checkbox'
                        value={`${option.id}~~${option.label}`}
                        checked={option.selected}
                    />
                    <label className='checkbox-label'>
                        {option.label}
                    </label>
                </div>
                ))}
            </div>
        );
    };

    const getMenuFooter = () => {
        return (
            <div className='menu-footer'>
                <button
                    type='button'
                    className='primary-btn'
                    onClick={handleOkClick}
                >
                    OK
                </button>

                <button
                    type='button'
                    className='secondary-btn'
                    onClick={handleCancelClick}
                >
                    CANCEL
                </button>
            </div>
        );
    };

    const getDropdownMenu = () => {
        if (!dropdownState.menuOpen) return ('');
        // //todo: test toggle onBlur
        // <div className='menu' {/*onBlur={toggleDropdownMenu}*/}>
        return (
            <div className='menu'>
                {getMenuHeader()}
                {getMenuBody()}
                {getMenuFooter()}
            </div>
        );
    };

    return (
        <div className='multi-drop-down-parent' ref={nodeRef}>
            {getDropdownButton()}
            {getDropdownMenu()}
        </div>
    );
};

export default MultiSelectDropdown;