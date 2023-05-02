import React from "react";
import NumberField from "../ui/NumberField";

const InputSection = ({ inputs, handleInputChange }) => {
    return (
        <div>
            <p>Inputs</p>
            <br />
            <NumberField
                value={inputs.a}
                onChange={handleInputChange}
                name="a"
            />
            <NumberField
                value={inputState.b}
                name="b"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default InputSection;
