import React, {useState} from 'react';

const NumberInput = (props) => {

    const [inputState, setInputState] = useState({value: props.value ? props.value : ''});

    const handleChange = (e) => {
        setInputState(e.target.value);
    };

    const keyPress = (e) => {
        if (e.keyCode != 13) return;
        if (e.target.value === '') {
            props.onChange(null);
        } else {
            props.onChange(e.target.value);
        }
    };

    return (
        <div className='number-input'>
            <input
                type='number'
                value={inputState.value}
                placeholder={props.placeholder}
                onKeyDown={keyPress}
                onChange={handleChange}
            >

            </input>
        </div>
    );
};

export default NumberInput;