import React from 'react'
import OperationDenomination from './OperationDenomination';
import GetChange from './GetChange';
import Alert from './Alert';

type OperationsProps = {
    denominations: {
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[];
    setDenominations: React.Dispatch<React.SetStateAction<{
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[]>>;
}




const Operations = ({ denominations, setDenominations }: OperationsProps) => {

    const [operation, setOperation] = React.useState("add");
    const [result, setResult] = React.useState({ success: false, message: "" });

    const handleOperations = (operation: string) => {
        setOperation(operation);
    };

    return (
        <div className="col-md-4 position-relative mt-5 floating-label-panel balance-sheet">
            <div className="border border-light shadow-sm rounded p-4 pt-5">
                <div className="position-absolute h2 bg-dark text-light px-2 mb-0">Operations</div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={operation === "Add" ? "nav-link text-dark active" : "nav-link text-dark"} onClick={() => handleOperations("Add")} >Add</button>
                    </li>
                    <li className="nav-item">
                        <button className={operation === "Take" ? "nav-link text-dark active" : "nav-link text-dark"} onClick={() => handleOperations("Take")}>Take</button>
                    </li>
                    <li className="nav-item">
                        <button className={operation === "Change" ? "nav-link text-dark active" : "nav-link text-dark"} onClick={() => handleOperations("Change")}>Change</button>
                    </li>
                </ul>
                {(operation === "Add" || operation === "Take") &&
                    <OperationDenomination denominations={denominations} operation={operation} setDenominations={setDenominations} setResult={setResult} />
                }
                {operation === "Change" &&
                    <GetChange denominations={denominations} setDenominations={setDenominations} setResult={setResult} />
                }
                {
                    result.message !== "" &&
                    <Alert result={result} setResult={setResult} />
                }
            </div>
        </div>
    )
}

export default Operations
