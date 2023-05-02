/* eslint-disable no-unused-vars */
/**
 * TODO: Handle user input fields => Done
 * TODO: Handle operations => Done
 * TODO: Handle a list of histories => Done
 * TODO: Render history list => Done
 * TODO: Restore the history => Done
 */

import { useState } from "react";
import NumberField from "./components/ui/NumberField";
import Button from "./components/ui/Button";
import InputSection from "./components/inputs/InputSection";

const initialInputState = {
    a: 0,
    b: 0,
};

function* generateId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}
const getId = generateId();

// console.log(generateId().next());
// console.log(generateId().next());

const App = () => {
    const [inputState, setInputState] = useState({ ...initialInputState });
    const [result, setResult] = useState(0);
    const [histories, setHistories] = useState([]);
    const [restoredHistory, setRestoredHistory] = useState(null);

    // input button manage
    const handleInputChange = (e) => {
        setInputState({
            ...inputState,
            [e.target.name]: parseInt(e.target.value),
        });
    };

    // handle operations
    const handleArithmeticOps = (operation) => {
        if (!inputState.a || !inputState.b) {
            alert("invalid input number");
            return;
        }

        const f = new Function(
            "operation",
            `
            return ${inputState.a} ${operation} ${inputState.b}

            `
        );
        const result = f(operation);
        setResult(result);

        // setResult(eval(`${inputState.a} ${operation} ${inputState.b}`));

        const historyItem = {
            id: getId.next().value,
            inputs: { ...inputState },
            operation,
            result,
            date: new Date(),
        };
        setHistories([historyItem, ...histories]);
    };

    // clear button
    const handleClearOps = () => {
        setInputState({
            ...initialInputState,
        });
        setResult(0);
    };

    // restore operation
    const handleRestoreBtn = (historyItem) => {
        setInputState({ ...historyItem.inputs });
        setRestoredHistory(historyItem.id);
    };

    return (
        <div style={{ width: "50%", margin: "0 auto" }}>
            <h1> Result: {result} </h1>
            <InputSection
                inputs={inputState}
                handleInputChange={handleInputChange}
            />
            <div>
                <br />
                <p>Operations</p>
                <br />
                <Button text="subs" onClick={() => handleArithmeticOps("+")} />
                {/* <button onClick={}>add</button> */}
                <button onClick={() => handleArithmeticOps("-")}>subs</button>
                <button onClick={() => handleArithmeticOps("*")}>multi</button>
                <button onClick={() => handleArithmeticOps("/")}>div</button>
                <button onClick={() => handleArithmeticOps("%")}>mod</button>
                <button onClick={handleClearOps}>clear</button>
            </div>
            <div>
                <br />
                <p>History</p>
                {histories.length === 0 ? (
                    <p>
                        <small>There is no history</small>
                    </p>
                ) : (
                    <ul>
                        {histories.map((historyItem) => {
                            <li key={historyItem.id}>
                                <p>
                                    Operation: {historyItem.inputs.a}
                                    {historyItem.operation}
                                    {historyItem.inputs.b}
                                    Result: {historyItem.result}
                                </p>
                                <small>
                                    {historyItem.date.toLocaleDateString()}
                                </small>
                                <br />
                                <button
                                    onClick={() =>
                                        handleRestoreBtn(historyItem)
                                    }
                                    disabled={
                                        restoredHistory !== null &&
                                        restoredHistory === historyItem.id
                                    }
                                >
                                    restore
                                </button>
                            </li>;
                        })}
                    </ul>
                )}
                <br />
            </div>
        </div>
    );
};

export default App;
